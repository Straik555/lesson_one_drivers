export class DomainError extends Error {
  constructor(
    public readonly detail: string,
    public readonly code: string,
    public readonly source?: string,
  ) {
    super(detail);
  }
}
