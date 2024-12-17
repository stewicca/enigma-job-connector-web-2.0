import { useState } from 'react';
import PropTypes from 'prop-types';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast.js';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const TextSubmissionDialog = ({children, text}) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast({ description: 'Copied to clipboard' });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast({variant: 'destructive', description: 'Failed to copy text submission.'});
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Text Submission</DialogTitle>
                </DialogHeader>
                <ScrollArea className='h-[200px] w-full rounded-md border p-4'>
                    <pre className='whitespace-pre-wrap font-mono text-sm'>
                        {text}
                    </pre>
                </ScrollArea>
                <div className='flex justify-end'>
                    <Button className='gap-2' onClick={copyToClipboard}>
                        <Copy className='h-4 w-4'/>
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

TextSubmissionDialog.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string
}

export default TextSubmissionDialog;
