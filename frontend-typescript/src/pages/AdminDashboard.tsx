import React, { useState } from 'react';
import { createBook } from '../services/bookService';
import type { AddBookRequest } from '../types/book';
import Input from '../components/Input';
import Button from '../components/Button';
import { PlusCircle, Book, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {

    const [formData, setFormData] = useState<AddBookRequest>({
        bookIsbn: '',
        bookTitle: '',
        bookImgUrl: '',
        bookAuthor: '',
        bookGenre: '',
        bookDescription: '',
        bookPublishYear: new Date().getFullYear(),
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: name === 'publishedYear' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
    
        try {
          await createBook(formData);
          setSuccess('Book created successfully!');
          setFormData({
            bookIsbn: '',
            bookTitle: '',
            bookImgUrl: '',
            bookAuthor: '',
            bookGenre: '',
            bookDescription: '',
            bookPublishYear: new Date().getFullYear()
          });
        } catch (err: any) {
          setError('Failed to create book. Please try again.');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                <Book className="w-8 h-8 mr-3 text-brand-600" />
                Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-2">Manage library content and settings.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-slate-500" />
                <h2 className="font-semibold text-slate-700">Add New Book</h2>
            </div>
            
            <div className="p-6">
                {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {success}
                </div>
                )}
                
                {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                    label="Book Title"
                    id="title"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleChange}
                    required
                    placeholder="e.g. The Great Gatsby"
                    />
                    <Input
                    label="Author"
                    id="author"
                    name="bookAuthor"
                    value={formData.bookAuthor}
                    onChange={handleChange}
                    required
                    placeholder="e.g. F. Scott Fitzgerald"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                    label="Genre"
                    id="genre"
                    name="bookGenre"
                    value={formData.bookGenre}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Classic Fiction"
                    />
                    <Input
                    label="Published Year"
                    id="publishedYear"
                    name="bookPublishedYear"
                    type="number"
                    value={formData.bookPublishYear}
                    onChange={handleChange}
                    required
                    />
                </div>

                <Input
                    label="Cover Image URL"
                    id="coverUrl"
                    name="bookImgUrl"
                    type="url"
                    value={formData.bookImgUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/cover.jpg"
                    className="font-mono text-sm"
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                    </label>
                    <textarea
                    id="description"
                    name="bookDescription"
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    value={formData.bookDescription}
                    onChange={handleChange}
                    required
                    placeholder="Enter a brief summary of the book..."
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" isLoading={loading}>
                    Add Book to Library
                    </Button>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default AdminDashboard;