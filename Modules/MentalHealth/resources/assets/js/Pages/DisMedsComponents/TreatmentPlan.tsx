import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Send } from 'lucide-react';

export default function TreatmentPlan() {
    const { data, setData, post, processing } = useForm({
        name: '',
        number_id: '',
        provider: '',
        date: '',
        presenting_problem: '',
        pharmacological: '',
        psychosocial: '',
        referrals: '',
        mns_management: '',
        crisis_plan: '',
        follow_up: '',
        other: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/treatment-plan');
    };

    return (
        <div className="mt-4 w-full overflow-hidden rounded-lg border">
            <div className="flex items-center bg-blue-500 px-4 py-3">
                <h6 className="w-full text-lg font-semibold text-white">
                    IV. Assess for self-harm or suicide and substance use disorders
                    <span className="text-sm text-white italic"> (Treatment Plan)</span>
                </h6>
            </div>
            <div className="space-y-6 p-6">
                {' '}
                {/* Added vertical spacing */}
                <Label htmlFor="assessment" className="mb-1 text-sm font-medium text-gray-600">
                    Treatment Plan
                </Label>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        </div>
                        <div>
                            <Label>Number/ID</Label>
                            <Input value={data.number_id} onChange={(e) => setData('number_id', e.target.value)} />
                        </div>
                        <div>
                            <Label>Date</Label>
                            <Input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />
                        </div>
                        <div>
                            <Label>Name of Health Care Provider</Label>
                            <Input value={data.provider} onChange={(e) => setData('provider', e.target.value)} />
                        </div>
                    </div>

                    {/* Textarea fields with spacing */}
                    <div className="space-y-4">
                        <div>
                            <Label>Presenting Problem</Label>
                            <Textarea value={data.presenting_problem} onChange={(e) => setData('presenting_problem', e.target.value)} />
                        </div>
                        <div>
                            <Label>Written Treatment Plan (Pharmacological interventions if any)</Label>
                            <Textarea value={data.pharmacological} onChange={(e) => setData('pharmacological', e.target.value)} />
                        </div>
                        <div>
                            <Label>Psychosocial Interventions</Label>
                            <Textarea value={data.psychosocial} onChange={(e) => setData('psychosocial', e.target.value)} />
                        </div>
                        <div>
                            <Label>Referrals</Label>
                            <Textarea value={data.referrals} onChange={(e) => setData('referrals', e.target.value)} />
                        </div>
                        <div>
                            <Label>Management of any concurrent physical and/or other MNS conditions</Label>
                            <Textarea value={data.mns_management} onChange={(e) => setData('mns_management', e.target.value)} />
                        </div>
                        <div>
                            <Label>Crisis Plan</Label>
                            <Textarea value={data.crisis_plan} onChange={(e) => setData('crisis_plan', e.target.value)} />
                        </div>
                        <div>
                            <Label>Follow-up Plan</Label>
                            <Textarea value={data.follow_up} onChange={(e) => setData('follow_up', e.target.value)} />
                        </div>
                        <div>
                            <Label>Other</Label>
                            <Textarea value={data.other} onChange={(e) => setData('other', e.target.value)} />
                        </div>
                    </div>

                    <div className="text-left">
                        <Button type="submit" disabled={processing}>
                            <Send size={16} className="mr-2" />
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
