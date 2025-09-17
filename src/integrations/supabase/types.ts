export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      builder_landing_pages: {
        Row: {
          about_section: Json | null
          builder_id: string
          contact_section: Json | null
          created_at: string | null
          custom_css: string | null
          hero_section: Json | null
          id: string
          is_active: boolean | null
          page_slug: string
          page_title: string
          projects_section: Json | null
          seo_meta: Json | null
          testimonials_section: Json | null
          updated_at: string | null
        }
        Insert: {
          about_section?: Json | null
          builder_id: string
          contact_section?: Json | null
          created_at?: string | null
          custom_css?: string | null
          hero_section?: Json | null
          id?: string
          is_active?: boolean | null
          page_slug: string
          page_title: string
          projects_section?: Json | null
          seo_meta?: Json | null
          testimonials_section?: Json | null
          updated_at?: string | null
        }
        Update: {
          about_section?: Json | null
          builder_id?: string
          contact_section?: Json | null
          created_at?: string | null
          custom_css?: string | null
          hero_section?: Json | null
          id?: string
          is_active?: boolean | null
          page_slug?: string
          page_title?: string
          projects_section?: Json | null
          seo_meta?: Json | null
          testimonials_section?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_landing_pages_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_projects: {
        Row: {
          amenities: string[] | null
          area_range: string | null
          builder_id: string
          configuration: string | null
          created_at: string | null
          floor_plans: Json | null
          gallery_images: string[] | null
          id: string
          image_url: string | null
          is_promoted: boolean | null
          location: string | null
          possession_date: string | null
          price_range: string | null
          project_type: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          amenities?: string[] | null
          area_range?: string | null
          builder_id: string
          configuration?: string | null
          created_at?: string | null
          floor_plans?: Json | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          is_promoted?: boolean | null
          location?: string | null
          possession_date?: string | null
          price_range?: string | null
          project_type?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          amenities?: string[] | null
          area_range?: string | null
          builder_id?: string
          configuration?: string | null
          created_at?: string | null
          floor_plans?: Json | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          is_promoted?: boolean | null
          location?: string | null
          possession_date?: string | null
          price_range?: string | null
          project_type?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_projects_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
        ]
      }
      builders: {
        Row: {
          awards: string[] | null
          certifications: string[] | null
          contact_address: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_website: string | null
          created_at: string | null
          description: string | null
          employee_count: string | null
          hero_image_url: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          mission: string | null
          name: string
          rating: number | null
          slug: string
          specialties: string[] | null
          total_area_delivered: string | null
          total_locations: number | null
          total_projects: number | null
          updated_at: string | null
          year_established: number | null
        }
        Insert: {
          awards?: string[] | null
          certifications?: string[] | null
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          mission?: string | null
          name: string
          rating?: number | null
          slug: string
          specialties?: string[] | null
          total_area_delivered?: string | null
          total_locations?: number | null
          total_projects?: number | null
          updated_at?: string | null
          year_established?: number | null
        }
        Update: {
          awards?: string[] | null
          certifications?: string[] | null
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          mission?: string | null
          name?: string
          rating?: number | null
          slug?: string
          specialties?: string[] | null
          total_area_delivered?: string | null
          total_locations?: number | null
          total_projects?: number | null
          updated_at?: string | null
          year_established?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          property_image: string | null
          property_location: string | null
          property_price: string | null
          property_title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          property_image?: string | null
          property_location?: string | null
          property_price?: string | null
          property_title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          property_image?: string | null
          property_location?: string | null
          property_price?: string | null
          property_title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
