import CompanyTable from '../_components/CompanyTable';

// Mock data for demonstration
const mockCompanies = [
  {
    id: '1',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '2',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '3',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '4',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '5',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '6',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '7',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '8',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '9',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
  {
    id: '10',
    name: '유재민',
    company: '멋쟁이사자처럼(기업명)',
    email: '1234@gmail.com',
    joinDate: '2025. 11.25',
    isActive: true,
  },
];

function CompaniesPage() {
  return <CompanyTable companies={mockCompanies} />;
}

export default CompaniesPage;