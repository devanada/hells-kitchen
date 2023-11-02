import type { Request } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { badRequest } from "@hapi/boom";

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorPath = error.issues
        .map((issue) => {
          return issue.path[issue.path.length - 1];
        })
        .join(", ");
      throw badRequest(`Input is invalid in ${errorPath}`);
    }
    return badRequest(JSON.stringify(error));
  }
}
