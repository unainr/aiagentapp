import { ChatInterface } from "@/components/ui/chat-interface";

type Props = {
	params: Promise<{
		workflowId: string;
	}>;
};

export default async function EmbedPage({ params }: Props) {
	const { workflowId } = await params;
	return <ChatInterface workflowId={workflowId} />;
}
