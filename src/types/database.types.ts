export type HobbyCategory = "alltag" | "hobby";
export type PremiumPlan = "monthly" | "yearly";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          phone_verified: boolean;
          bio: string | null;
          avatar_url: string | null;
          city: string | null;
          lat: number | null;
          lng: number | null;
          is_premium: boolean;
          premium_since: string | null;
          premium_plan: PremiumPlan | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          phone_verified?: boolean;
          bio?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          lat?: number | null;
          lng?: number | null;
          is_premium?: boolean;
          premium_since?: string | null;
          premium_plan?: PremiumPlan | null;
          onboarding_completed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      hobbies: {
        Row: {
          id: string;
          name: string;
          category: HobbyCategory;
          icon: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: HobbyCategory;
          icon?: string;
        };
        Update: Partial<Database["public"]["Tables"]["hobbies"]["Insert"]>;
        Relationships: [];
      };
      profile_preferences: {
        Row: {
          profile_id: string;
          hobby_id: string;
        };
        Insert: {
          profile_id: string;
          hobby_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["profile_preferences"]["Insert"]>;
        Relationships: [];
      };
      ratings: {
        Row: {
          id: string;
          rated_user_id: string;
          rated_by_id: string;
          stars: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          rated_user_id: string;
          rated_by_id: string;
          stars: number;
          comment?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["ratings"]["Insert"]>;
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          user1_id: string;
          user2_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user1_id: string;
          user2_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          created_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          read_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
        Relationships: [];
      };
      listings: {
        Row: {
          id: string;
          author_id: string;
          hobby_id: string | null;
          title: string;
          description: string | null;
          city: string;
          lat: number | null;
          lng: number | null;
          event_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          hobby_id?: string | null;
          title: string;
          description?: string | null;
          city: string;
          lat?: number | null;
          lng?: number | null;
          event_at?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["listings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      nearby_profiles: {
        Args: {
          origin_lat: number;
          origin_lng: number;
          radius_km?: number;
          max_results?: number;
        };
        Returns: {
          id: string;
          display_name: string;
          bio: string | null;
          avatar_url: string | null;
          city: string | null;
          is_premium: boolean;
          distance_km: number;
        }[];
      };
      get_or_create_conversation: {
        Args: { other_user_id: string };
        Returns: string;
      };
      nearby_listings: {
        Args: {
          origin_lat: number;
          origin_lng: number;
          radius_km?: number;
          max_results?: number;
        };
        Returns: {
          id: string;
          author_id: string;
          hobby_id: string | null;
          title: string;
          description: string | null;
          city: string;
          event_at: string | null;
          created_at: string;
          distance_km: number;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Hobby = Database["public"]["Tables"]["hobbies"]["Row"];
export type ProfilePreference = Database["public"]["Tables"]["profile_preferences"]["Row"];
export type Rating = Database["public"]["Tables"]["ratings"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type Listing = Database["public"]["Tables"]["listings"]["Row"];
