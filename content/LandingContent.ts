import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import { BarChart, Bell, Clock, CreditCard, Facebook, Instagram, Leaf, Linkedin, Twitter, Users } from "lucide-react";

export const LandingContent = {
	hero: {
		title: "Run Your Study Hall the Smart Way",
		subtitle: "Go eco-friendly, ditch pen-paper chaos, and manage seats, attendance, and payments in one powerful dashboard.",
		buttons: [
			{ label: "Get Started Free", href: "/get-started", variant: "default" },
			{ label: "Request a Demo", href: "/demo", variant: "ghost" },
		],
	},

	features: {
		title: "Powerful Features to Simplify Your Study Hall",
		subtitle: "Say goodbye to pen-paper chaos. Manage everything from seats to payments in a smarter, eco-friendly way.",
		items: [
			{
				icon: Users,
				title: "Seat Management",
				description: "Easily allocate or revoke seats in just one click — no messy registers.",
			},
			{
				icon: Clock,
				title: "Attendance Tracking",
				description: "Accurate digital attendance logs you can access anytime, anywhere.",
			},
			{
				icon: CreditCard,
				title: "Automated Payments",
				description: "Collect fees, send reminders, and track dues automatically.",
			},
			{
				icon: Bell,
				title: "Smart Notifications",
				description: "Instant updates for fees, holidays, or seat availability — directly to students.",
			},
			{
				icon: BarChart,
				title: "Revenue Insights",
				description: "Track monthly income, unpaid dues, and overall performance with simple analytics.",
			},
			{
				icon: Leaf,
				title: "Eco-Friendly",
				description: "Go paperless and save time, money, and the environment with a fully digital system.",
			},
		],
	},
	stats: {
		title: "Trusted Numbers, Real Impact",
		subtitle: "From small study halls to large libraries, SeatTracker is helping owners streamline their operations, save time, and deliver a better experience for students.",
		items: [
			{ value: "0", label: "Libraries Trust Us" },
			{ value: "0", label: "Students Managed" },
			{ value: "0", label: "Seats Allocated Daily" },
		],
	},

	pricing: {
		title: "Simple, Affordable Pricing",
		subtitle: "No hidden fees. Pay only for what you need.",
		plans: [
			{
				name: "Starter",
				price: "₹499/month",
				features: ["Up to 50 students", "Seat management", "Attendance tracking", "Basic notifications"],
			},
			{
				name: "Professional",
				price: "₹999/month",
				features: ["Unlimited students", "Automated payment reminders", "Advanced analytics", "Priority support"],
			},
		],
	},

	testimonials: {
		title: "Trusted by Library Owners",
		items: [
			{
				name: "Ramesh Yadav",
				role: "Owner, Smart Study Hall",
				quote: "This system completely changed the way I run my library. Payments are on time, and I don’t have to worry about attendance anymore.",
			},
			{
				name: "Priya Sharma",
				role: "Owner, Bright Minds Library",
				quote: "Earlier I used to spend hours managing registers. Now everything is digital, and my students love the transparency.",
			},
		],
	},

	footer: {
		socials: [
			{ name: "Twitter", href: "#", icon: IconBrandTwitter },
			{ name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
			{ name: "Facebook", href: "#", icon: IconBrandFacebook },
			{ name: "Instagram", href: "#", icon: IconBrandInstagram },
		],
		contact: {
			email: "support@seattracker.com",
			phone: "+91 98765 43210",
		},
	},
};
