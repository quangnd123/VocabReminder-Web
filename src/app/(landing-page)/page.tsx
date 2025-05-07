import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaLink } from "react-icons/fa"; // Import social icons

export default function AboutPage(){
    const linkedinUrl = process.env.NEXT_PUBLIC_MY_LINKEDIN_URL;
    const facebookUrl = process.env.NEXT_PUBLIC_MY_FACEBOOK_URL;
    const websiteUrl = process.env.NEXT_PUBLIC_MY_WEBSITE_URL;
  
    return (
        <div className="flex justify-center items-start min-h-full py-12">
          <Card className="w-full max-w-md shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Welcome to Vocab Reminder</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Features:</h3>
                <p className="text-sm text-gray-600">
                  Link your vocabulary to what you read online. <br/>
                  Example: If you want to memorize "luminous" (in any language)  and sees "What a bright student" (in any language) online, a reminder pops up: "Bright? —It also means: luminous!" <br/>
                  Vocab Reminder can work cross-lingually.
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Get Started:</h3>
                <p className="text-sm text-gray-600">
                    Install:
                </p>
            </div>
          
            <div className="mt-6 flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                  <span className="font-semibold">Contact:</span>
              </p>
              {linkedinUrl && (
                <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
              {facebookUrl && (
                <Link href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                  <FaFacebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
              {websiteUrl && (
                <Link href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                  <FaLink className="h-5 w-5" />
                  <span className="sr-only">Website</span>
                </Link>
              )}
            </div>
            </CardContent>
          </Card>
        </div>
      );
}