import { Button } from "@/components/ui/button";

interface UserProfileCardProps {
  name: string;
  email: string;
  role: string;
}

export function UserProfileCard({ name, email, role }: UserProfileCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">{email}</p>
          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
            {role}
          </span>
        </div>
        <Button variant="outline" size="sm">
          Edit Profile
        </Button>
      </div>
    </div>
  );
} 