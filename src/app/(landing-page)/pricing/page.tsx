import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaLink } from "react-icons/fa"; // Import social icons

export default function PricingPage(){
    return (
        <div className="flex justify-center items-start min-h-full py-12">
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Pricing</CardTitle>
            <CardDescription>Learn about Vocab Reminder's plans.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Free Plan</h3>
                <p className="text-sm text-gray-600">
                    Vocab Reminder is free.
                </p>
                <p className="text-sm text-gray-500 italic">
                Note: the free version uses free Large Language Model APIs, so slow response time is expected (approximately 5-10 seconds for a request).
                </p>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Coming Soon: Paid Plans</h3>
                <p className="text-sm text-gray-600">
                    Significantly faster and smarter response speed.
                </p>
            </div>
            </CardContent>
        </Card>
        </div>
      );
}