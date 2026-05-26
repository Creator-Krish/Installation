import { z } from "zod";

export const executionStatusSchema = z.enum([
  "pending",
  "running",
  "completed",
  "failed",
  "blocked"
]);

export const nodeActionSchema = z.enum([
  "launchApp",
  "openPath",
  "openUrl",
  "typeText",
  "pressHotkey",
  "runShell",
  "wait",
  "focusApp"
]);

export const workflowNodeSchema = z.object({
  id: z.string().min(1),
  action: nodeActionSchema,
  params: z.record(z.string(), z.any()).default({}),
  next: z.array(z.string()).default([]),
  condition: z.string().optional()
});

export const workflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  entryNodeId: z.string().min(1),
  nodes: z.array(workflowNodeSchema).min(1),
  tags: z.array(z.string()).default([])
});

export const executionEventSchema = z.object({
  workflowId: z.string(),
  nodeId: z.string(),
  status: executionStatusSchema,
  timestamp: z.string(),
  message: z.string(),
  metadata: z.record(z.string(), z.any()).optional()
});

export const compileRequestSchema = z.object({
  input: z.string().min(1),
  previewOnly: z.boolean().default(true)
});

export const compiledCommandSchema = z.object({
  originalInput: z.string(),
  normalizedInput: z.string(),
  reasoning: z.array(z.string()).default([]),
  workflow: workflowSchema,
  warnings: z.array(z.string()).default([])
});

export const compileResponseSchema = z.object({
  ok: z.boolean(),
  command: compiledCommandSchema,
  usedAi: z.boolean()
});

export const executeRequestSchema = z.object({
  workflow: workflowSchema,
  dryRun: z.boolean().default(false)
});

export const executeResponseSchema = z.object({
  ok: z.boolean(),
  executionId: z.string(),
  status: executionStatusSchema,
  events: z.array(executionEventSchema)
});

export type ExecutionStatus = z.infer<typeof executionStatusSchema>;
export type NodeAction = z.infer<typeof nodeActionSchema>;
export type WorkflowNode = z.infer<typeof workflowNodeSchema>;
export type Workflow = z.infer<typeof workflowSchema>;
export type ExecutionEvent = z.infer<typeof executionEventSchema>;
export type CompileRequest = z.infer<typeof compileRequestSchema>;
export type CompiledCommand = z.infer<typeof compiledCommandSchema>;
export type CompileResponse = z.infer<typeof compileResponseSchema>;
export type ExecuteRequest = z.infer<typeof executeRequestSchema>;
export type ExecuteResponse = z.infer<typeof executeResponseSchema>;
