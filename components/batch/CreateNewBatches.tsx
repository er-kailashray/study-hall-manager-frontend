'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useRouter } from "next/navigation";

// ---------- Types ----------
export type AutoBatchRow = {
    batch: string;
    totalSeats: number;
    startDate: string;
    endDate: string;
    price: number;
    startTime: string;
    endTime: string;
};

// ---------- Helpers ----------
function normalizeToHalfHour(value: string): string {
    if (!value) return value;
    const [hStr, mStr] = value.split(':');
    let h = Number(hStr);
    const m = Number(mStr);
    let rounded = Math.round(m / 30) * 30;
    if (rounded === 60) {
        h = (h + 1) % 24;
        rounded = 0;
    }
    return `${String(h).padStart(2, '0')}:${String(rounded).padStart(2, '0')}`;
}

function timeToMins(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

function minsToTime(total: number): string {
    const minutesInDay = 24 * 60;
    const norm = ((total % minutesInDay) + minutesInDay) % minutesInDay;
    const h = Math.floor(norm / 60);
    const m = norm % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function addMinutes(time: string, mins: number): string {
    return minsToTime(timeToMins(time) + mins);
}

function addOneMonthMinusOneDay(startDate: string): string {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + 1);
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
}

// ---------- Schedule generator ----------
function generateBatchSchedule({
    totalBatch,
    durationHours,
    totalSeats,
    libraryStartTime,
    startDate,
    price,
}: {
    totalBatch: number;
    durationHours: number;
    totalSeats: number;
    libraryStartTime: string;
    startDate: string;
    price: number;
}): AutoBatchRow[] {
    const stepMins = durationHours * 60;
    const rows: AutoBatchRow[] = [];
    let start = libraryStartTime;
    const endDate = addOneMonthMinusOneDay(startDate);

    for (let i = 1; i <= totalBatch; i++) {
        const end = addMinutes(start, stepMins);
        rows.push({
            batch: `Batch ${i}`,
            totalSeats,
            startDate,
            endDate,
            price,
            startTime: start,
            endTime: end,
        });
        start = end;
    }
    return rows;
}

// ---------- Component ----------
export default function CreateNewBatches() {
    const [batchSchedule, setBatchSchedule] = useState({
        totalBatch: 4,
        durationHours: 2,
        totalSeats: 50,
        libraryStartTime: '06:00',
        startDate: new Date().toISOString().split("T")[0],
        endDate: addOneMonthMinusOneDay(new Date().toISOString().split("T")[0]), // <-- NEW
        price: 1000,
    });

    const [autoBatches, setAutoBatches] = useState<AutoBatchRow[]>([]);
    const [startErrors, setStartErrors] = useState<Record<number, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const router = useRouter();

    // --- Handlers ---
    const handleAutoBatchStartChange = (index: number, value: string) => {
        const snapped = normalizeToHalfHour(value);
        const prevEnd = index > 0 ? autoBatches[index - 1].endTime : null;

        let adjustedStart = snapped;
        let errorMsg = '';

        if (prevEnd && timeToMins(adjustedStart) < timeToMins(prevEnd)) {
            adjustedStart = prevEnd;
            errorMsg = "Start time can't be earlier than the previous batch end time.";
        }

        const newEnd = addMinutes(adjustedStart, batchSchedule.durationHours * 60);

        setAutoBatches((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], startTime: adjustedStart, endTime: newEnd };
            return copy;
        });

        setStartErrors((prev) => {
            const next = { ...prev };
            if (errorMsg) next[index] = errorMsg;
            else delete next[index];
            return next;
        });
    };

    const handleGenerate = () => {
        setStartErrors({});
        setSubmitMessage(null);
        setAutoBatches(
            generateBatchSchedule({
                totalBatch: batchSchedule.totalBatch,
                durationHours: batchSchedule.durationHours,
                totalSeats: batchSchedule.totalSeats,
                libraryStartTime: normalizeToHalfHour(batchSchedule.libraryStartTime),
                startDate: batchSchedule.startDate,
                price: batchSchedule.price,
            })
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">Create Batch</h1>

            {/* Generator */}
            <section className="col-span-2 border p-3 rounded bg-muted/40 mb-6">
                <h2 className="text-lg font-medium mb-3">Generate Schedule</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block font-medium">Total Batch</label>
                        <Input
                            type="text"
                            min={1}
                            value={String(batchSchedule.totalBatch)}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) { // allow only digits
                                    setBatchSchedule((s) => ({ ...s, totalBatch: val === "" ? 0 : Number(val) }));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Duration (hours)</label>
                        <Input
                            type="text"
                            min={1}
                            value={String(batchSchedule.durationHours)}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) { // allow only digits
                                    setBatchSchedule((s) => ({ ...s, durationHours: val === "" ? 0 : Number(val) }));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Total Seats per Batch</label>
                        <Input
                            type="text"
                            min={1}
                            value={String(batchSchedule.totalSeats)}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) { // allow only digits
                                    setBatchSchedule((s) => ({ ...s, totalSeats: val === "" ? 0 : Number(val) }));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Batch Start Date</label>
                        <Input
                            type="date"
                            value={batchSchedule.startDate}
                            onChange={(e) => {
                                const newStart = e.target.value;
                                const newEnd = addOneMonthMinusOneDay(newStart);
                                setBatchSchedule((s) => ({ ...s, startDate: newStart, endDate: newEnd }));
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Batch End Date</label>
                        <Input
                            type="date"
                            value={batchSchedule.endDate}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Batch Price</label>
                        <Input
                            type="text"
                            min={1}
                            value={batchSchedule.price}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) { // allow only digits
                                    setBatchSchedule((s) => ({ ...s, price: val === "" ? 0 : Number(val) }));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">Library Start Time</label>
                        <Input
                            type="time"
                            step={1800}
                            value={batchSchedule.libraryStartTime}
                            onChange={(e) => setBatchSchedule((s) => ({ ...s, libraryStartTime: normalizeToHalfHour(e.target.value) }))}
                        />
                    </div>
                </div>

                <Button type="button" className="mt-3" onClick={handleGenerate}>
                    Generate Batch Schedule
                </Button>
            </section>

            {/* Preview */}
            {autoBatches.length > 0 && (
                <section className="mt-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Batch</TableHead>
                                <TableHead>Total Seats</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {autoBatches.map((b, idx) => {
                                const hasStartErr = Boolean(startErrors[idx]);
                                return (
                                    <TableRow key={b.batch}>
                                        <TableCell>{b.batch}</TableCell>
                                        <TableCell>{b.totalSeats}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                value={b.price}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^\d*$/.test(val)) { // allow only digits
                                                        setAutoBatches((prev) => {
                                                            const copy = [...prev];
                                                            copy[idx] = { ...copy[idx], price: val === "" ? 0 : Number(val) };
                                                            return copy;
                                                        });
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="time"
                                                step={1800}
                                                value={b.startTime}
                                                onChange={(e) => handleAutoBatchStartChange(idx, e.target.value)}
                                                className={hasStartErr ? "border-red-500" : ""}
                                            />
                                            {hasStartErr && (
                                                <span className="text-xs text-red-600">{startErrors[idx]}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="time"
                                                step={1800}
                                                value={b.endTime}
                                                onChange={(e) => {
                                                    const val = normalizeToHalfHour(e.target.value);
                                                    setAutoBatches((prev) => {
                                                        const copy = [...prev];
                                                        copy[idx] = { ...copy[idx], endTime: val };
                                                        return copy;
                                                    });
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between mt-4">
                        <div className="min-h-[1.25rem]">
                            {submitMessage && (
                                <span className={`text-sm ${submitMessage.toLowerCase().includes('fail') ? 'text-red-600' : 'text-green-700'}`}>
                                    {submitMessage}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setAutoBatches([])} disabled={submitting}>
                                Clear
                            </Button>
                            <Button disabled={submitting}>
                                {submitting ? 'Creating...' : 'Create All Batches'}
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
