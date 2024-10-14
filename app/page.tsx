import Calculator from '@/components/Calculator';
import DeviceWrapper from '@/components/DeviceWrapper';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <DeviceWrapper>
        <Calculator />
      </DeviceWrapper>
    </div>
  );
}