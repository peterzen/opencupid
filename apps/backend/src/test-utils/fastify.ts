export type RouteHandler = (req: any, reply: any) => any

export class MockFastify {
  public routes: Record<string, RouteHandler> = {}
  public jwt = {
    sign: (payload: any) => JSON.stringify(payload)
  }
  public prisma: any = {}
  public log = { error: () => {}, warn: () => {}, info: () => {} }
  public authenticate = (_req: any, _reply: any) => {}

  get(path: string, handler: RouteHandler) {
    this.routes[`GET ${path}`] = handler
  }
  post(path: string, handler: RouteHandler) {
    this.routes[`POST ${path}`] = handler
  }
  patch(path: string, handler: RouteHandler) {
    this.routes[`PATCH ${path}`] = handler
  }
  delete(path: string, handler: RouteHandler) {
    this.routes[`DELETE ${path}`] = handler
  }
  register(_plugin: any, _opts?: any) {
    // no-op for tests
  }
}

export class MockReply {
  statusCode = 200
  payload: any
  code(status: number) {
    this.statusCode = status
    return this
  }
  send(payload: any) {
    this.payload = payload
    return this
  }
}
