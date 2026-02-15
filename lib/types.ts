export type ResolveStatus =
  | "ok"
  | "password_required"
  | "invalid_password"
  | "expired"
  | "not_found";

export interface ResolveResponse {
  status: ResolveStatus | string;
  clip_id: string | null;
  title: string | null;
  content: string | null;
  expires_at: string | null;
  click_count: number | null;
  requires_password: boolean;
}
