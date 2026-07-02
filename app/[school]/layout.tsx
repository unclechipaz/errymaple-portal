import type { Metadata } from "next";
import { schoolsData, SchoolSlug } from "@/lib/schools-data";
import HighSchoolNavbar from "@/components/high-school/Navbar";
import HighSchoolFooter from "@/components/high-school/Footer";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ school: string }> }): Promise<Metadata> {
  const { school } = await params;
  const schoolSlug = school as SchoolSlug;
  const schoolInfo = schoolsData[schoolSlug];
  
  if (!schoolInfo) {
    return {
      title: "Errymaple School"
    };
  }
  
  return {
    title: `${schoolInfo.name} | ${schoolInfo.tagline}`,
    description: `${schoolInfo.aboutText} Join ${schoolInfo.name} in Zvishavane, Zimbabwe. Academic excellence, tech innovation, boarding facilities.`,
    keywords: [
      schoolInfo.name,
      schoolInfo.shortName,
      "Errymaple Zvishavane",
      "STEM education Zimbabwe",
      "Private secondary school Zimbabwe"
    ]
  };
}

export default async function SchoolLayout({ children, params }: LayoutProps) {
  const { school } = await params;
  const schoolSlug = school as SchoolSlug;
  
  // Guard clause against invalid school names
  if (!schoolsData[schoolSlug]) {
    notFound();
  }
  
  return (
    <>
      <HighSchoolNavbar schoolSlug={schoolSlug} />
      <div className="min-h-screen">
        {children}
      </div>
      <HighSchoolFooter schoolSlug={schoolSlug} />
    </>
  );
}
