"use client";

import { LanguageData } from "@/types/type";
import hasWordTokenizerlanguagesJson from "@/../public/has-word-tokenizer-languages.json";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaLink } from "react-icons/fa"; // Import social icons

export default function MyPage() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  const user = session.user;
  const hasWordTokenizerlanguagesData: LanguageData[] = hasWordTokenizerlanguagesJson;
  const hasWordTokenizerlanguages = hasWordTokenizerlanguagesData.map((data) => data.name).join(", ");

  const linkedinUrl = process.env.NEXT_PUBLIC_MY_LINKEDIN_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_MY_FACEBOOK_URL;
  const websiteUrl = process.env.NEXT_PUBLIC_MY_WEBSITE_URL;

  return (
    <div className="flex justify-center items-start min-h-full py-12">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">👋 Hello, {user.name ? user.name : "there" }!</CardTitle>
          <CardDescription>Welcome to Vocab Reminder</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-sm text-gray-600">
              Get started by setting up your preferred languages in your account. (Click on the bottom left corner or this button)
            </p>
            <Link href="/dashboard/account">
                <Button variant="outline" size="sm" className="mt-2">
                Go to Account
                </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Then, head over to the Vocabulary page to add the words you want to memorize.
            </p>
            <Link href="/dashboard/vocabulary">
                <Button variant="outline" size="sm" className="mt-2">
                Go to Vocabulary
                </Button>
            </Link>
            
          </div>

          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Development Note:</span> Vocab Reminder is in its early stages, and I&#39;m a solo player. If you want to report bugs, request features, or simply chat, please please please contact me. I&#39;m so happy to know if someone is using my product.  
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Language Support:</span> Vocab Reminder uses word tokenizers for analyzing your online reading material. Full support is currently available for:{" "}
              <span className="font-medium">{hasWordTokenizerlanguages}</span>. Other languages are still working ok with partial support. If your preferred languages are not listed and you want full support, please let me know, and I&#39;ll add it.
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