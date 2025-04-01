import { useSearchParams, useRouter } from "next/navigation";

export function useQueryParamsModal(param: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isOpen = searchParams.get(param) === "true";

  const openModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(param, "true");
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(param);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return { isOpen, openModal, closeModal };
}
