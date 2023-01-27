export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
      };
      Account: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          oauth_token: string | null;
          oauth_token_secret: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          refresh_token_expires_in: number | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          userId: string;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          refresh_token_expires_in?: number | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          userId: string;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          refresh_token_expires_in?: number | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          userId?: string;
        };
      };
      Comment: {
        Row: {
          createdAt: string;
          id: string;
          postId: string;
          text: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          postId: string;
          text: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          postId?: string;
          text?: string;
          updatedAt?: string;
          userId?: string;
        };
      };
      Example: {
        Row: {
          createdAt: string;
          id: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          updatedAt?: string;
        };
      };
      Post: {
        Row: {
          createdAt: string;
          id: string;
          keywords: string[] | null;
          text: string;
          title: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          keywords?: string[] | null;
          text: string;
          title: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          keywords?: string[] | null;
          text?: string;
          title?: string;
          updatedAt?: string;
          userId?: string;
        };
      };
      Session: {
        Row: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string;
        };
        Insert: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string;
        };
        Update: {
          expires?: string;
          id?: string;
          sessionToken?: string;
          userId?: string;
        };
      };
      User: {
        Row: {
          bio: string | null;
          email: string | null;
          emailVerified: string | null;
          firstName: string | null;
          id: string;
          image: string | null;
          isAdmin: boolean;
          lastName: string | null;
          location: string | null;
          name: string | null;
          password: string | null;
          portfolio: string | null;
          profileUrl: string | null;
          username: string | null;
        };
        Insert: {
          bio?: string | null;
          email?: string | null;
          emailVerified?: string | null;
          firstName?: string | null;
          id: string;
          image?: string | null;
          isAdmin?: boolean;
          lastName?: string | null;
          location?: string | null;
          name?: string | null;
          password?: string | null;
          portfolio?: string | null;
          profileUrl?: string | null;
          username?: string | null;
        };
        Update: {
          bio?: string | null;
          email?: string | null;
          emailVerified?: string | null;
          firstName?: string | null;
          id?: string;
          image?: string | null;
          isAdmin?: boolean;
          lastName?: string | null;
          location?: string | null;
          name?: string | null;
          password?: string | null;
          portfolio?: string | null;
          profileUrl?: string | null;
          username?: string | null;
        };
      };
      VerificationToken: {
        Row: {
          expires: string;
          identifier: string;
          token: string;
        };
        Insert: {
          expires: string;
          identifier: string;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string;
          token?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
