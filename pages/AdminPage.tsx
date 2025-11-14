
import React, { useState, useCallback } from 'react';
import { useSeatingData } from '../hooks/useSeatingData';
import type { SeatingRecord } from '../types';
import { Icon } from '../components/icons';

// In a real app, this would be handled by a proper auth system.
const ADMIN_PASSWORD = 'yoksinadmin100';

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [parsedData, setParsedData] = useState<SeatingRecord[]>([]);

    const { saveSeatingData, clearSeatingData, seatingData } = useSeatingData();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('密码错误，请重试。');
        }
    };

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadStatus('正在解析文件...');
        setParsedData([]);
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const workbook = (window as any).XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = (window as any).XLSX.utils.sheet_to_json(worksheet);

                const records: SeatingRecord[] = json.map((row, index) => {
                    const name = row['姓名']?.toString().trim();
                    const seat = row['座位号']?.toString().trim();

                    if (!name || !seat) {
                        throw new Error(`第 ${index + 2} 行数据不完整，请检查。`);
                    }
                    return {
                        id: `${name}-${index}`,
                        name,
                        seat,
                    };
                });
                setParsedData(records);
                saveSeatingData(records);
                setUploadStatus(`成功导入 ${records.length} 条记录！`);
            } catch (err: any) {
                setUploadStatus(`文件解析失败: ${err.message}`);
                setParsedData([]);
            }
        };
        reader.onerror = () => {
            setUploadStatus('读取文件失败。');
        };
        reader.readAsBinaryString(file);
    }, [saveSeatingData]);
    
    const handleClearData = () => {
        if (window.confirm('您确定要删除所有座位数据吗？此操作不可撤销。')) {
            clearSeatingData();
            setParsedData([]);
            setUploadStatus('所有数据已清除。');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800">管理后台登录</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">密码</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <div>
                            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-brand-red rounded-md hover:bg-brand-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition-colors">
                                <Icon type="login" className="w-5 h-5 mr-2" />
                                登录
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
    const currentData = parsedData.length > 0 ? parsedData : seatingData;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">数据管理面板</h1>
                <button onClick={() => setIsLoggedIn(false)} className="flex items-center text-sm text-gray-600 hover:text-brand-red">
                    <Icon type="login" className="w-5 h-5 mr-1 transform rotate-180" />
                    退出
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Section */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">上传座位数据</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        请上传 Excel 文件 (.xlsx, .xls)。文件需包含 <code className="bg-gray-200 text-gray-700 px-1 rounded">姓名</code> 和 <code className="bg-gray-200 text-gray-700 px-1 rounded">座位号</code> 这两列。
                    </p>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="file-upload" className="flex-1 cursor-pointer inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-brand-red rounded-md hover:bg-brand-red/90 transition-colors">
                            <Icon type="upload" className="w-5 h-5 mr-2"/>
                            选择文件
                        </label>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </div>
                     {uploadStatus && <p className="mt-4 text-sm text-gray-600">{uploadStatus}</p>}
                </div>
                
                {/* Data Control Section */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                     <h2 className="text-xl font-semibold text-gray-700 mb-4">数据操作</h2>
                     <p className="text-sm text-gray-500 mb-4">当前系统中共有 <span className="font-bold text-brand-red">{seatingData.length}</span> 条记录。您可以清空所有数据。</p>
                     <button onClick={handleClearData} disabled={seatingData.length === 0} className="w-full flex items-center justify-center px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        <Icon type="trash" className="w-5 h-5 mr-2" />
                        清空所有数据
                    </button>
                </div>
            </div>

            {/* Data Preview */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">数据预览 (最多显示100条)</h2>
                {currentData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">座位号</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentData.slice(0, 100).map(record => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.seat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">系统中暂无数据，请上传文件。</p>
                )}
            </div>

        </div>
    );
};

export default AdminPage;
