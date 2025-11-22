import {  boolean, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  agent_name: varchar('agent_name', { length: 255 }).notNull(),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});




// Workflows Table - Stores all node configurations
export const workflows = pgTable('workflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').references(() => agents.id, { onDelete: 'cascade' }).notNull(),
  
  // Store complete workflow structure
  nodes: jsonb('nodes'),
  edges: jsonb('edges'),
  version: varchar('version', { length: 50 }).default('1.0.0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});



export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').references(() => agents.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 255 }),
  messages: jsonb('messages').notNull().default('[]'),
  createdAt: timestamp('created_at').defaultNow(),
});