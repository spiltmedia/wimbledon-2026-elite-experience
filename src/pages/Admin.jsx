import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Phone, Calendar, Filter, MessageSquare, Users } from 'lucide-react';
import { format } from 'date-fns';
import TestimonialsManager from '../components/admin/TestimonialsManager';

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  converted: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => base44.entities.Inquiry.list('-created_date')
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Inquiry.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === statusFilter);

  const stats = {
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    converted: inquiries.filter(i => i.status === 'converted').length,
    total: inquiries.length
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage leads, testimonials, and content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'testimonials'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Testimonials
          </button>
        </div>

        {activeTab === 'inquiries' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 border border-blue-500/30 rounded-xl p-6">
            <div className="text-blue-400 text-sm font-semibold mb-2">New Inquiries</div>
            <div className="text-3xl font-bold text-white">{stats.new}</div>
          </div>
          <div className="bg-slate-800 border border-yellow-500/30 rounded-xl p-6">
            <div className="text-yellow-400 text-sm font-semibold mb-2">Contacted</div>
            <div className="text-3xl font-bold text-white">{stats.contacted}</div>
          </div>
          <div className="bg-slate-800 border border-green-500/30 rounded-xl p-6">
            <div className="text-green-400 text-sm font-semibold mb-2">Converted</div>
            <div className="text-3xl font-bold text-white">{stats.converted}</div>
          </div>
          <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-6">
            <div className="text-purple-400 text-sm font-semibold mb-2">Total Leads</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Inquiries</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Contact</TableHead>
                <TableHead className="text-gray-400">Package Interest</TableHead>
                <TableHead className="text-gray-400">Message</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400 py-12">
                    Loading inquiries...
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400 py-12">
                    No inquiries yet
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} className="border-slate-700 hover:bg-slate-750">
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {format(new Date(inquiry.created_date), 'MMM d, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">{inquiry.name}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <a href={`mailto:${inquiry.email}`} className="hover:text-purple-400">
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <a href={`tel:${inquiry.phone}`} className="hover:text-purple-400">
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {inquiry.package_interest || '-'}
                    </TableCell>
                    <TableCell className="text-gray-300 max-w-xs">
                      <div className="truncate">{inquiry.message}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[inquiry.status]} border capitalize`}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={inquiry.status}
                        onValueChange={(status) =>
                          updateStatusMutation.mutate({ id: inquiry.id, status })
                        }
                      >
                        <SelectTrigger className="w-32 bg-slate-900 border-slate-700 text-white h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
          </>
        )}

        {activeTab === 'testimonials' && <TestimonialsManager />}
      </div>
    </div>
  );
}