"use client";

import { Header } from "@/components/dashboard/header";
import { properties, agreements } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  User,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PropertyDetailPage() {
  const params = useParams();
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return (
      <>
        <Header title="Property Not Found" />
        <main className="flex-1 p-6 flex items-center justify-center">
          <p className="text-slate-500">Property not found.</p>
        </main>
      </>
    );
  }

  const propertyAgreements = agreements.filter(
    (a) => a.propertyId === property.id
  );

  return (
    <>
      <Header title="Property Details" />
      <main className="flex-1 p-6 overflow-y-auto">
        <Link
          href="/dashboard/properties"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-slate-300" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">
                      {property.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {property.address}, {property.subCity} Sub-City, Woreda{" "}
                        {property.woreda}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}
                  >
                    {formatStatus(property.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-slate-500">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-slate-500">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {property.area} m²
                      </p>
                      <p className="text-xs text-slate-500">Area</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 capitalize">
                        {property.propertyType}
                      </p>
                      <p className="text-xs text-slate-500">Type</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Agreements for this property */}
            {propertyAgreements.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Tenancy Agreements
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {propertyAgreements.map((agreement) => (
                    <Link
                      key={agreement.id}
                      href={`/dashboard/agreements/${agreement.id}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {agreement.tenantName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatDate(agreement.startDate)} –{" "}
                            {formatDate(agreement.endDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-900">
                          {formatCurrency(agreement.monthlyRent)}/mo
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}
                        >
                          {formatStatus(agreement.status)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-1">Monthly Rent</p>
              <p className="text-3xl font-bold text-primary-700">
                {formatCurrency(property.monthlyRent)}
              </p>
              <p className="text-xs text-slate-400 mt-1">per month</p>
            </div>

            {/* Landlord */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Property Owner
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {property.landlordName}
                  </p>
                  <p className="text-xs text-slate-500">Verified Landlord</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Timeline
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">Registered:</span>
                <span className="text-slate-700">
                  {formatDate(property.createdAt)}
                </span>
              </div>
              {property.verifiedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">Verified:</span>
                  <span className="text-slate-700">
                    {formatDate(property.verifiedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
