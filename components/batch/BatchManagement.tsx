'use client'

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Eye
} from 'lucide-react';

type Batch = {
  id: string;
  name: string;
  description: string;
  instructor: string;
  subject: string;
  schedule: { days: string[]; startTime: string; endTime: string };
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  room: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  fees: number;
};

type Student = { id: string; name: string; email: string; enrollmentDate: string; feeStatus: string };
type BatchStudents = { [key: string]: Student[] };

const BatchManagement: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [batchStudents, setBatchStudents] = useState<BatchStudents>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Map API payload into local Batch shape
  function normalizeRecord(rec: any): Batch {
    // Flexible mapping to handle common field names from APIs
    const id = String(rec.id ?? rec.batch_id ?? crypto.randomUUID());
    const name = String(rec.name ?? rec.batch_name ?? 'Batch');
    const description = String(rec.description ?? '');
    const instructor = String(rec.instructor ?? '');
    const subject = String(rec.subject ?? '');
    const startTime = String(rec.start_time ?? rec.batch_start_time ?? rec.schedule?.startTime ?? '09:00');
    const endTime = String(rec.end_time ?? rec.batch_end_time ?? rec.schedule?.endTime ?? '11:00');
    const days: string[] = Array.isArray(rec.days ?? rec.schedule?.days) ? (rec.days ?? rec.schedule?.days) : [];
    const capacity = Number(rec.capacity ?? rec.total_seats ?? 0);
    const enrolled = Number(rec.enrolled ?? 0);
    const startDate = String(rec.start_date ?? '');
    const endDate = String(rec.end_date ?? '');
    const room = String(rec.room ?? '');
    const status = (String(rec.status ?? 'active') as Batch['status']);
    const fees = Number(rec.fees ?? 0);

    return {
      id,
      name,
      description,
      instructor,
      subject,
      schedule: { days, startTime, endTime },
      capacity,
      enrolled,
      startDate,
      endDate,
      room,
      status,
      fees,
    };
  }

  // Load batches via POST on mount (API type: POST)
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       setLoading(true);
//       setLoadError(null);
//       try {
//         // If the endpoint requires a body, put filters/pagination here; else send {}.
//         const res = await api.get('/auth/batches', {}); // given: type POST
//         const raw = res?.data?.data ?? res?.data ?? [];
//         const list = Array.isArray(raw) ? raw : [];
//         const normalized = list.map(normalizeRecord);

//         if (!mounted) return;
//         setBatches(normalized);

//         // Initialize empty student lists keyed by batch id (can be replaced when API provides students)
//         const initStudents: BatchStudents = {};
//         normalized.forEach(b => { initStudents[b.id] = initStudents[b.id] ?? []; });
//         setBatchStudents(initStudents);
//       } catch (err: any) {
//         if (!mounted) return;
//         const msg =
//           err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           err?.message ||
//           'Failed to load batches.';
//         setLoadError(msg);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

  const filteredBatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return batches.filter(batch => {
      const matchesSearch =
        batch.name.toLowerCase().includes(q) ||
        batch.instructor.toLowerCase().includes(q) ||
        batch.subject.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'all' || batch.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [batches, searchQuery, filterStatus]);

  function handleDeleteBatch(id: string) {
    if (confirm('Are you sure you want to delete this batch?')) {
      setBatches(prev => prev.filter(batch => batch.id !== id));
      setBatchStudents(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const stats = {
    total: batches.length,
    active: batches.filter(b => b.status === 'active').length,
    upcoming: batches.filter(b => b.status === 'upcoming').length,
    completed: batches.filter(b => b.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-foreground">Batch Management</h1>
            <p className="text-muted-foreground mt-1">Manage batches, schedules, and enrollments</p>
          </div>
          {batches.length === 0 && (
            <Button asChild>
              <Link href="../dashboard/batches/new">
                <Plus size={16} className="mr-2" />
                Create Batch
              </Link>
            </Button>
          )}
        </div>

        {/* Loading / Error */}
        {loading && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Loading batches…</p>
            </CardContent>
          </Card>
        )}
        {loadError && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-red-600">{loadError}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Batches</p>
                  <p className="text-2xl text-foreground">{stats.total}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl text-green-600">{stats.active}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl text-blue-600">{stats.upcoming}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl text-gray-600">{stats.completed}</p>
                </div>
                <Users className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters/Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search batches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Batches Table */}
        <Card>
          <CardHeader>
            <CardTitle>Batches ({filteredBatches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">{batch.name}</p>
                        <p className="text-xs text-muted-foreground">{batch.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{batch.instructor}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">
                          {batch.schedule.days.join(', ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {batch.schedule.startTime} - {batch.schedule.endTime}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">{batch.enrolled}/{batch.capacity}</p>
                        <div className="w-16 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${batch.capacity > 0 ? (batch.enrolled / batch.capacity) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedBatch(batch)}>
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingBatch(batch)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteBatch(batch.id)}>
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && filteredBatches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <p className="text-sm text-muted-foreground">No batches found.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatchManagement;
