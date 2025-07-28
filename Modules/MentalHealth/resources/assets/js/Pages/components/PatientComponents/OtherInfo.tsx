import { Pencil } from 'lucide-react';

export default function OtherInfo() {
    return (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
            <div className="space-y-3">
                <div className="flex items-center gap-1">
                    <Pencil className="h-4 w-4 text-green-600" />
                    <h2 className="text-md font-semibold">OTHER INFO</h2>
                </div>
                <hr />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"></div>
            </div>
        </div>
    );
}
