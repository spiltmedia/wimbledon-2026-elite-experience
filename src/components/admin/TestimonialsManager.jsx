import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';

export default function TestimonialsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    quote: '',
    customer_name: '',
    origin_city: '',
    hotel: 'Both',
    rating: 5,
    is_active: true
  });

  const queryClient = useQueryClient();

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Testimonial.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Testimonial.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Testimonial.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    }
  });

  const resetForm = () => {
    setFormData({
      quote: '',
      customer_name: '',
      origin_city: '',
      hotel: 'Both',
      rating: 5,
      is_active: true
    });
    setEditingTestimonial(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      quote: testimonial.quote,
      customer_name: testimonial.customer_name,
      origin_city: testimonial.origin_city || '',
      hotel: testimonial.hotel,
      rating: testimonial.rating || 5,
      is_active: testimonial.is_active
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Testimonials</h2>
          <p className="text-gray-400">Manage customer reviews and social proof</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quote" className="text-white">Quote *</Label>
                <Textarea
                  id="quote"
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="This was the trip of a lifetime..."
                  className="bg-slate-900 border-slate-700 text-white min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_name" className="text-white">Customer Name *</Label>
                  <Input
                    id="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="John Smith"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="origin_city" className="text-white">Origin City</Label>
                  <Input
                    id="origin_city"
                    value={formData.origin_city}
                    onChange={(e) => setFormData({ ...formData, origin_city: e.target.value })}
                    placeholder="New York, NY"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hotel" className="text-white">Hotel *</Label>
                  <Select
                    value={formData.hotel}
                    onValueChange={(value) => setFormData({ ...formData, hotel: value })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Both">Both Hotels</SelectItem>
                      <SelectItem value="Holiday Inn Bloomsbury">Holiday Inn Bloomsbury</SelectItem>
                      <SelectItem value="The Welbeck Hotel">The Welbeck Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rating" className="text-white">Rating *</Label>
                  <Select
                    value={String(formData.rating)}
                    onValueChange={(value) => setFormData({ ...formData, rating: Number(value) })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_active" className="text-white cursor-pointer">
                  Display on website
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  {editingTestimonial ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <Badge className={testimonial.is_active ? 'bg-green-600' : 'bg-gray-600'}>
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline" className="text-gray-300">
                    {testimonial.hotel}
                  </Badge>
                </div>
                <p className="text-white italic mb-3">"{testimonial.quote}"</p>
                <p className="text-gray-400 text-sm">
                  — {testimonial.customer_name}
                  {testimonial.origin_city && <span>, {testimonial.origin_city}</span>}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(testimonial)}
                  className="text-gray-400 hover:text-white"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Delete this testimonial?')) {
                      deleteMutation.mutate(testimonial.id);
                    }
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No testimonials yet. Add your first one!
          </div>
        )}
      </div>
    </div>
  );
}