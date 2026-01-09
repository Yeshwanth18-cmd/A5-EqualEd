"use client";

import { useState } from "react";
import { PDFUpload } from "@/components/features/sign-language/pdf-upload";
import { SignLanguagePlayer } from "@/components/features/sign-language/interpreter-player";
import { DocumentViewer } from "@/components/features/sign-language/document-viewer";
import { SignLanguageProcessResponse, SignLanguageSegment } from "@/lib/sign-language/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignLanguagePage() {
    const [segments, setSegments] = useState<SignLanguageSegment[]>([]);
    const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    const handleProcessingComplete = (data: SignLanguageProcessResponse) => {
        setSegments(data.segments);
        if (data.segments.length > 0) {
            setCurrentSegmentId(data.segments[0].id);
        }
        setIsReady(true);
    };

    const reset = () => {
        setSegments([]);
        setCurrentSegmentId(null);
        setIsReady(false);
    };

    return (
        <div className="container max-w-7xl mx-auto py-8 min-h-screen">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {isReady && (
                        <Button variant="ghost" className="gap-2" onClick={reset}>
                            <ArrowLeft className="h-4 w-4" /> Upload New
                        </Button>
                    )}
                    {!isReady && (
                        <Link href="/dashboard">
                            <Button variant="ghost" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                            </Button>
                        </Link>
                    )}
                </div>

                <h1 className="text-3xl font-bold font-style-serif text-foreground">Sign Language Interpreter</h1>
            </div>

            {!isReady ? (
                <div className="max-w-xl mx-auto mt-12">
                    <PDFUpload onProcessingComplete={handleProcessingComplete} />
                    <div className="mt-12 text-center text-muted-foreground p-6 bg-secondary/50 rounded-lg">
                        <h3 className="font-semibold mb-2">Accessibility Note</h3>
                        <p className="text-sm">
                            This feature uses AI to extract text from your document and matches it with a verified sign language video database.
                            If a direct match is unavailable, we will use fingerspelling or closest-match approximation.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Document Side */}
                    <div className="order-2 lg:order-1 lg:col-span-8 pb-32">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Document Content</h2>
                            <span className="text-sm text-muted-foreground">{segments.length} segments extracted</span>
                        </div>
                        <DocumentViewer
                            segments={segments}
                            currentSegmentId={currentSegmentId}
                            onSegmentClick={setCurrentSegmentId}
                        />
                    </div>

                    {/* Video Side - Sticky/Floating */}
                    {/* On Desktop it's sticky side, on Mobile it's fixed bottom via the component itself */}
                    <div className="order-1 lg:order-2 lg:col-span-4">
                        <div className="lg:sticky lg:top-24">
                            <SignLanguagePlayer
                                segments={segments}
                                currentSegmentId={currentSegmentId}
                                onSegmentChange={setCurrentSegmentId}
                            />
                            <div className="mt-4 hidden lg:block bg-card p-4 rounded border text-sm text-muted-foreground">
                                <p><strong>Keyboard Shortcuts:</strong></p>
                                <ul className="list-disc ml-5 mt-1 space-y-1">
                                    <li><kbd className="px-1 bg-muted rounded">Space</kbd> Play/Pause</li>
                                    <li><kbd className="px-1 bg-muted rounded">←</kbd> / <kbd className="px-1 bg-muted rounded">→</kbd> Prev/Next Segment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
