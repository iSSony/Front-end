// Imports
import { isLoggedIn } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAppSelector } from "@/redux/hooks";
import { ENUM_USER_ROLES } from "@/enums/user";

const AuthLayout = ({
  onlyAdminAccess,
  onlyStudentAccess,
  children,
}: {
  onlyAdminAccess?: boolean;
  onlyStudentAccess?: boolean;
  children: React.ReactNode;
}) => {
  // Getting whether user is logged in or not
  const userSession = isLoggedIn();
  const { currentUser } = useAppSelector((state) => state.user);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirecting to login page if user not authenticated
    if (!userSession || !currentUser) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [currentUser, userSession, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (onlyAdminAccess) {
    if (!currentUser || currentUser.role !== ENUM_USER_ROLES.ADMIN) {
      router.push("/");
    }
  }

  if (onlyStudentAccess) {
    if (!currentUser || currentUser.role !== ENUM_USER_ROLES.STUDENT) {
      router.push("/");
    }
  }

  return <>{children}</>;
};

export default AuthLayout;
