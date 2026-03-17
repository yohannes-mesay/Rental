"use client";

import { Header } from "@/components/dashboard/header";
import { properties } from "@/lib/dummy-data";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PropertiesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = properties.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <Header title="Properties" />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="verified">Verified</option>
                <option value="pending_verification">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <Link
            href="/dashboard/properties/register"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Register Property
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <Link
              key={property.id}
              href={`/dashboard/properties/${property.id}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <Building2 className="w-12 h-12 text-slate-300" />
                <span
                  className={`absolute top-3 right-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}
                >
                  {formatStatus(property.status)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.address}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" />
                    {property.bedrooms} Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" />
                    {property.bathrooms} Bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" />
                    {property.area} m²
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-lg font-bold text-primary-700">
                    {formatCurrency(property.monthlyRent)}
                    <span className="text-xs font-normal text-slate-400">
                      /month
                    </span>
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {property.subCity}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No properties found</p>
          </div>
        )}
      </main>
    </>
  );
}
