import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Project Template</CardTitle>
                    <CardDescription>
                        This is a clean project with your UI components and Tailwind CSS ready to go.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Start building your new app by editing <code>src/App.tsx</code> and adding new pages.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-full">
                                <Link to="/changes">View Change Management</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
