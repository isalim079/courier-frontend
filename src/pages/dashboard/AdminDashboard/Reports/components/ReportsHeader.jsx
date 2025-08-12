import { Download } from 'lucide-react';

function ReportsHeader({ onExportReport, loading }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your courier operations
          </p>
        </div>
        <button 
          onClick={onExportReport}
          disabled={loading}
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>{loading ? 'Exporting...' : 'Export CSV'}</span>
        </button>
      </div>
    </div>
  );
}

export default ReportsHeader;
