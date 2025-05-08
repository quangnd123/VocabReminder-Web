import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PricingPage(){
    return (
        <div className="flex justify-center items-start min-h-full py-12">
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Pricing</CardTitle>
            <CardDescription>Learn about Vocab Reminder&#39;s plans.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Free Plan:</h3>
                <p className="text-sm text-gray-600">
                    Access to all basic features. <br/>
                    (Sometimes) quite slow and stupid reminders.
                </p>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Paid Plan: Coming soon</h3>
                <p className="text-sm text-gray-600">
                    I&#39;m trying to make the system smarter and faster, so it becomes worth your money.
                </p>
            </div>
            </CardContent>
        </Card>
        </div>
      );
}