
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Users, UserPlus, Search, MoreHorizontal, Phone, Mail, MapPin, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const customers = [
  {
    id: 1,
    name: 'Sarah Nkosi',
    company: 'Cape Fresh Market',
    email: 'sarah@capefresh.co.za',
    phone: '+27 83 456 7890',
    location: 'Cape Town',
    status: 'active',
    totalSpent: 78500,
    lastOrder: '2023-08-15',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Michael van der Merwe',
    company: 'Tech Solutions SA',
    email: 'michael@techsolutions.co.za',
    phone: '+27 82 345 6789',
    location: 'Johannesburg',
    status: 'active',
    totalSpent: 124750,
    lastOrder: '2023-09-02',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Thabo Molefe',
    company: 'Urban Designs',
    email: 'thabo@urbandesigns.co.za',
    phone: '+27 71 234 5678',
    location: 'Pretoria',
    status: 'inactive',
    totalSpent: 43200,
    lastOrder: '2023-05-22',
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'Lerato Dlamini',
    company: 'Golden Harvest',
    email: 'lerato@goldenharvest.co.za',
    phone: '+27 76 123 4567',
    location: 'Durban',
    status: 'active',
    totalSpent: 92350,
    lastOrder: '2023-08-28',
    avatar: '/placeholder.svg',
  },
  {
    id: 5,
    name: 'James Smith',
    company: 'Coastal Supplies',
    email: 'james@coastalsupplies.co.za',
    phone: '+27 74 987 6543',
    location: 'Port Elizabeth',
    status: 'active',
    totalSpent: 67800,
    lastOrder: '2023-07-19',
    avatar: '/placeholder.svg',
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      minimumFractionDigits: 2 
    }).format(amount);
  };

  const handleViewCustomer = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setViewMode('details');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Customer</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="cursor-pointer" onClick={() => handleViewCustomer(customer)}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <img 
                              src={customer.avatar} 
                              alt={customer.name}
                              className="object-cover"
                            />
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.company}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span>{customer.email}</span>
                          <span className="text-muted-foreground">{customer.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          customer.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {customer.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                      <TableCell>
                        {new Date(customer.lastOrder).toLocaleDateString('en-ZA')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleViewCustomer(customer);
                            }}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={(e) => e.stopPropagation()}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          selectedCustomer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <img src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{selectedCustomer.name}</CardTitle>
                        <CardDescription className="text-base">{selectedCustomer.company}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewMode('table')}
                    >
                      Back to list
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Business Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>Company: {selectedCustomer.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last Order: {new Date(selectedCustomer.lastOrder).toLocaleDateString('en-ZA')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Financial Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalSpent)}</div>
                            <p className="text-xs text-muted-foreground">Total Spent</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{formatCurrency(0)}</div>
                            <p className="text-xs text-muted-foreground">Outstanding</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>The customer's most recent purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>ORD-{selectedCustomer.id}-3201</TableCell>
                          <TableCell>{new Date(selectedCustomer.lastOrder).toLocaleDateString('en-ZA')}</TableCell>
                          <TableCell>{formatCurrency(selectedCustomer.totalSpent * 0.2)}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Completed
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ORD-{selectedCustomer.id}-3190</TableCell>
                          <TableCell>
                            {new Date(new Date(selectedCustomer.lastOrder).setMonth(
                              new Date(selectedCustomer.lastOrder).getMonth() - 1
                            )).toLocaleDateString('en-ZA')}
                          </TableCell>
                          <TableCell>{formatCurrency(selectedCustomer.totalSpent * 0.35)}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Completed
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ORD-{selectedCustomer.id}-3180</TableCell>
                          <TableCell>
                            {new Date(new Date(selectedCustomer.lastOrder).setMonth(
                              new Date(selectedCustomer.lastOrder).getMonth() - 2
                            )).toLocaleDateString('en-ZA')}
                          </TableCell>
                          <TableCell>{formatCurrency(selectedCustomer.totalSpent * 0.15)}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Completed
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>Customer-specific information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      No notes available for this customer. Click below to add notes.
                    </p>
                    <Button variant="outline" className="w-full mt-4">Add Note</Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        )}
      </div>
    </MainLayout>
  );
};

export default Customers;
