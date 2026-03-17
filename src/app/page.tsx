import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  FileText,
  BarChart3,
  Scale,
  Bell,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Digital Tenancy Agreements",
    description:
      "Create, sign, and manage legally compliant rental agreements digitally. Auto-validation ensures adherence to the proclamation.",
  },
  {
    icon: Building2,
    title: "Property Registration",
    description:
      "Register and verify residential properties with document authentication through DARA integration.",
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    description:
      "Report violations, track disputes, and resolve conflicts through a transparent, auditable platform.",
  },
  {
    icon: BarChart3,
    title: "Market Analytics",
    description:
      "Real-time dashboards with rental trends, occupancy rates, and revenue insights across all sub-cities.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Enforcement",
    description:
      "Automated validation of rent caps, advance payment limits, and minimum lease terms per the proclamation.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated alerts for expiring agreements, pending approvals, due dates, and violation status updates.",
  },
];

const stats = [
  { value: "300K+", label: "Rental Units in A.A" },
  { value: "2.8B+", label: "ETB Annual Tax Gap" },
  { value: "10-15", label: "Days Manual Processing" },
  { value: "70%+", label: "Informal Agreements" },
];

const stakeholders = [
  {
    role: "Tenants",
    benefits: [
      "Protection against arbitrary rent increases",
      "Digital proof of tenancy",
      "Transparent dispute resolution",
      "Secure deposit management",
    ],
  },
  {
    role: "Landlords",
    benefits: [
      "Streamlined property registration",
      "Digital agreement management",
      "Guided rent adjustment process",
      "Reduced administrative burden",
    ],
  },
  {
    role: "Government",
    benefits: [
      "Centralized rental market data",
      "Tax revenue optimization",
      "Evidence-based policy making",
      "Real-time compliance monitoring",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                AA Rental<span className="text-primary-600">Control</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#stakeholders" className="text-sm text-slate-600 hover:text-primary-600 transition-colors">
                Stakeholders
              </a>
              <a href="#about" className="text-sm text-slate-600 hover:text-primary-600 transition-colors">
                About
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Aligned with the New Rental Proclamation
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Modernizing Addis Ababa&apos;s{" "}
              <span className="text-primary-600">Rental Governance</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A centralized digital platform for transparent, compliant, and
              efficient residential rental management — connecting tenants,
              landlords, and regulatory authorities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-primary-300 text-slate-700 font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-700 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Comprehensive Platform Features
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every tool needed to manage, monitor, and regulate Addis
              Ababa&apos;s residential rental market under one roof.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section id="stakeholders" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Designed to serve the diverse needs of tenants, landlords, and
              government authorities within the Addis Ababa rental ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.role}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-slate-900">
                    {stakeholder.role}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {stakeholder.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            About This System
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Addis Ababa Residential House Rental Control and Administration
            System is designed to implement the new rental housing proclamation
            through technology. By digitizing agreement registration, enabling
            compliance monitoring, and providing market analytics, the system
            transforms how rental housing is governed in Ethiopia&apos;s capital.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Developed as part of a final year project at Addis Ababa Science and
            Technology University, Department of Software Engineering, this
            platform serves as both an academic contribution and a practical
            solution for one of the city&apos;s most pressing urban challenges.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Rental Management?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Join the platform that&apos;s bringing transparency and fairness to
            Addis Ababa&apos;s rental market.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors"
          >
            Create Your Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">
                AA RentalControl
              </span>
            </div>
            <p className="text-sm text-center">
              Addis Ababa Science and Technology University — Department of
              Software Engineering
            </p>
            <p className="text-sm">&copy; 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
