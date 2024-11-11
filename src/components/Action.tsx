import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CopyButton from './ui/CopyButton';
import { utils } from "near-api-js";

export const JsonView = ({ data, copy }: { data: object, copy?: string }) => {
    copy = copy ?? JSON.stringify(data);
    return (
        <>
            <pre className="bg-gray-900 rounded-md p-3 overflow-x-auto">
                <code className="text-sm">
                    {JSON.stringify(data, null, 2)
                        .split('\n')
                        .map((line, i) => (
                            <div key={i}>
                                {line}
                            </div>
                        ))}
                </code>
            </pre>
            <div className="absolute top-3 right-3">
                <CopyButton text={copy} />
            </div>
        </>
    );
};

export const Action = ({ action }: { action: any }) => {
    const parseArgs = (argsBase64: string) => {
        try {
            const decoded = atob(argsBase64);
            const parsed = JSON.parse(decoded);
            return { isJson: true, content: parsed };
        } catch {
            const decoded = atob(argsBase64);
            const hex = Array.from(decoded)
                .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
                .join('');
            return { isJson: false, content: `0x${hex}` };
        }
    };

    if (action["Delegate"]) {
        return (
            <div className="space-y-2 w-full">
                <div className="font-medium">Delegate:</div>
                <ol className="pl-5 space-y-2 w-full">
                    {action["Delegate"]["delegate_action"]["actions"].map((action: any, index: number) => (
                        <li key={index} className="w-full">
                            <Action action={action} />
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

    if (action["FunctionCall"]) {
        const { method_name, args } = action["FunctionCall"];
        const parsedArgs = parseArgs(args);

        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-green-500">Function Call:</span>
                            <span className="font-mono">{method_name}</span>
                            <CopyButton text={method_name} />
                        </div>

                        <div className="space-y-2">
                            <span className="font-medium text-gray-500">Arguments:</span>
                            <div className="w-full">
                                {parsedArgs.isJson ? (
                                    <div className="relative">
                                        <JsonView data={parsedArgs.content} />
                                    </div>
                                ) : (
                                    <div className="pl-4 font-mono text-sm break-all rounded-md p-3">
                                        {parsedArgs.content}
                                        <CopyButton text={parsedArgs.content} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (action["Transfer"]) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-blue-500">Transfer:</span>
                        <span className="font-mono">
                            {utils.format.formatNearAmount(action["Transfer"]["deposit"])} NEAR
                        </span>
                        <CopyButton text={action["Transfer"]["deposit"]} />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardContent className="pt-6">
                <div className="relative">
                    <JsonView data={action} />
                </div>
            </CardContent>
        </Card>
    );
};
