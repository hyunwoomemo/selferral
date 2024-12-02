import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "User",
    // url: "/admin/user",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "user",
    isActive: true,
    items: [
      {
        title: "유저 목록",
        url: "/admin/userlist",
        icon: "userPen",
      },
      {
        title: "UID 목록",
        url: "/admin/uidlist",
        icon: "userPen",
      },
    ], // No child items
  },
  // {
  //   title: "User",
  //   url: "/admin/employee",
  //   icon: "user",
  //   isActive: false,
  // },
  {
    title: "Exchange",
    url: "/admin/exchange",
    icon: "product",
    isActive: true,
    items: [
      {
        title: "거래소 목록",
        url: "/admin/exchangeList",
        icon: "userPen",
      },
      {
        title: "이벤트 목록",
        url: "/admin/exchangeEvent",
        icon: "userPen",
      },
    ], // No child items
  },
  {
    title: "Affiliate",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "billing",
    isActive: true,

    items: [
      {
        title: "출금 신청 리스트",
        url: "/admin/affiliate/withdrawal",
        icon: "userPen",
      },
      {
        title: "액셀 업로드",
        url: "/admin/affiliate/excel",
        icon: "login",
      },
    ],
  },
  {
    title: "Site",
    url: "#",
    icon: "",
    isActive: true,
    items: [
      {
        title: "서비스 소개",
        url: "/admin/site/service",
        icon: "userPen",
      },
    ],
  },
  // {
  //   title: "Kanban",
  //   url: "/admin/kanban",
  //   icon: "kanban",
  //   isActive: false,
  //   items: [], // No child items
  // },
];
