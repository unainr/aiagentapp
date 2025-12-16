"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Code2, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EmbedDialogProps {
	workflowId: string;
}

export function EmbedDialog({ workflowId }: EmbedDialogProps) {
	const [origin, setOrigin] = useState("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setOrigin(window.location.origin);
		}
	}, []);

	const embedUrl = `${origin}/embed/${workflowId}`;

	const iframeCode = `<iframe
  src="${embedUrl}"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>`;

	// A script-based widget approach (optional, but requested "copy link")
	// For now, let's Stick to the requested "Fixed chat link" which might imply just the URL or an iframe.
	// The user said: "i can this link copy and used my other any website as footer via fixed chat link"
	// This sounds like they want a floating widget.
	// I'll provide a simple script that creates a floating iframe.

	const scriptCode = `<script>
(function() {
  var div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.bottom = '20px';
  div.style.right = '20px';
  div.style.zIndex = '9999';
  
  var iframe = document.createElement('iframe');
  iframe.src = '${embedUrl}';
  iframe.style.width = '350px';
  iframe.style.height = '500px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '10px';
  iframe.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  
  div.appendChild(iframe);
  document.body.appendChild(div);
})();
</script>`;

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		toast.success("Code copied to clipboard");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<Code2 className="size-4" />
					Embed Agent
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Embed Your Agent</DialogTitle>
					<DialogDescription>
						Integrate your agent into any website using the codes below.
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="script" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="script">Floating Widget</TabsTrigger>
						<TabsTrigger value="iframe">Iframe</TabsTrigger>
					</TabsList>
					<TabsContent value="script" className="space-y-4 pt-4">
						<div className="space-y-2">
							<p className="text-sm font-medium">Floating Widget Script</p>
							<p className="text-sm text-muted-foreground">
								Add this script to your website's footer to show a floating chat
								widget.
							</p>
						</div>
						<div className="relative">
							<Textarea
								className="min-h-[200px] font-mono text-sm resize-none pr-12"
								readOnly
								value={scriptCode}
							/>
							<Button
								size="icon"
								variant="ghost"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(scriptCode)}>
								{copied ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
							</Button>
						</div>
					</TabsContent>
					<TabsContent value="iframe" className="space-y-4 pt-4">
						<div className="space-y-2">
							<p className="text-sm font-medium">Standard Iframe</p>
							<p className="text-sm text-muted-foreground">
								Use this code to embed the chat directly into a page section.
							</p>
						</div>
						<div className="relative">
							<Textarea
								className="min-h-[150px] font-mono text-sm resize-none pr-12"
								readOnly
								value={iframeCode}
							/>
							<Button
								size="icon"
								variant="ghost"
								className="absolute top-2 right-2"
								onClick={() => handleCopy(iframeCode)}>
								{copied ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
							</Button>
						</div>
					</TabsContent>
				</Tabs>
				<div className="pt-4 border-t flex justify-end">
					<Button asChild variant="secondary" className="gap-2">
						<a
							href="/embed-test.html"
							target="_blank"
							rel="noopener noreferrer">
							Test Widget Page
						</a>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
