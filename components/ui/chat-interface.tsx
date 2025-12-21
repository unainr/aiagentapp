"use client";

import { executeWorkflowChat } from "@/modules/workflow/server/chat-actions";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { workFlowExecute } from "@/lib/workflow-executor";
import { Textarea } from "@/components/ui/textarea"
export function ChatInterface({ workflowId }: { workflowId: string }) {
	const [messages, setMessages] = useState<
		Array<{ role: "user" | "assistant"; content: string }>
	>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (messages.length > 0) {
			setTimeout(scrollToBottom, 100);
		}
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim() || loading) return;

		const userMessage = input.trim();
		setInput("");

		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
		setLoading(true);

		const result = await workFlowExecute(workflowId, userMessage);

		setLoading(false);

		if (result.error) {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: result.error! },
			]);
		} else {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: result.response || "No response" },
			]);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
	<div className="flex flex-col h-full w-full bg-background overflow-hidden">
  {/* Messages Area */}
  <ScrollArea className="flex-1 min-h-0">
    <div className="px-4 py-4 space-y-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Start a conversation</p>
            <p className="text-xs text-muted-foreground">
              Send a message to interact with your workflow
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-4 py-2 overflow-hidden wrap-break-word ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {msg.content}
            </p>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              Thinking...
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  </ScrollArea>

  {/* Input Area (FIXED & ALWAYS VISIBLE) */}
  <div className="border-t p-4 shrink-0 bg-background">
    <div className="flex gap-2">
      <Textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading}
        className="flex-1"
      />
      <Button
        onClick={handleSend}
        disabled={loading || !input.trim()}
        size="icon"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>

    <p className="text-xs text-muted-foreground text-center mt-1">
      Press Enter to send
    </p>
  </div>
</div>

	);
}
