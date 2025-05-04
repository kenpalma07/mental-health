import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Pencil, Trash2 } from 'lucide-react'; 

const ModalRXDiagMeds = () => {

  const handleView = () => {
    // Add functionality for view
  };

  const handleEdit = () => {
    // Add functionality for edit
  };

  const handleDelete = () => {
    // Add functionality for delete
  };

  return (
    <div className="printable">
      <table className="w-full text-sm border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Start Date</th>
            <th className="border p-2 text-left">Medicine</th>
            <th className="border p-2 text-left">Instructions</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
            <tr> {/* Use unique keys */}
              <td className="border p-2">01/01/2025</td>
              <td className="border p-2">paracetamol</td>
              <td className="border p-2">take every 3 hours</td>
              <td className="border p-2">8</td>
              <td className="border p-2 flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleView}
                  className="border-green-600 text-green-600 hover:bg-green-500"
                >
                  <Printer size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-500"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="border-red-600 text-red-600 hover:bg-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModalRXDiagMeds;
