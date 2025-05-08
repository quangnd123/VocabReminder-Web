import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";

export default function AboutPage() {
  const linkedinUrl = process.env.NEXT_PUBLIC_MY_LINKEDIN_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_MY_FACEBOOK_URL;
  const websiteUrl = process.env.NEXT_PUBLIC_MY_WEBSITE_URL;

  return (
    <div className="flex justify-center items-start min-h-full py-12 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Welcome to Vocab Reminder</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 text-sm text-gray-700">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Features:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Link what you see to your vocab:</span>
                <ul className="list-[circle] ml-7 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Store Vocabulary:</span> You store the word <span className="font-medium">&#34;特别&#34;</span> (Chinese for <em>special</em>).
                  </li>
                  <li>
                    <span className="font-medium">Surf the Web:</span> You come across the sentence:<br />
                    <em>&#34;Donald Trump is known for his unique communication style.&#34;</em>
                  </li>
                  <li>
                    <span className="font-medium">Reminder Pop-Up:</span> A reminder appears:<br />
                    <em>&#34;Do you still remember this word &#39;特别&#39;? It has a similar meaning to &#39;unique&#39;.&#34;</em>
                  </li>
                </ul>
              </li>
              <li><span className="font-medium">Translate a word with AI by right-clicking</span></li>
              <li><span className="font-medium">176 languages supported</span></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Get Started:</h3>
            <p>Install the extension and start linking what you read to your learning.</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Contact</p>
            <div className="flex items-center space-x-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
