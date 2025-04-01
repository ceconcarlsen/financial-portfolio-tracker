"use client";

import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SidebarBreadcrumbs() {
  const pathname = usePathname();
  const lastPathSegment = pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block"></BreadcrumbItem>
        <BreadcrumbSeparator className="hidden text-gray-400 md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Badge variant="secondary" className="capitalize">
              {lastPathSegment}
            </Badge>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
