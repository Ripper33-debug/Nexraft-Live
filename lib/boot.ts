export const BOOT_KEY = "nexraft-boot";

export function completeBoot(choreo = false) {
  document.documentElement.classList.remove("boot-pending");
  document.documentElement.classList.add("boot-complete");
  if (choreo) {
    document.documentElement.classList.add("boot-choreo");
  }
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* private browsing */
  }
  window.dispatchEvent(new CustomEvent("nexraft:boot-complete"));
}
