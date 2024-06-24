import HubSpotConnectBtn from '@/components/Social/HubSpotConnectBtn.jsx';

export default function Index() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
        <p className="mb-6 text-gray-600 text-center">Sign in to continue</p>
        <HubSpotConnectBtn />
      </div>
    </div>
  );
}
