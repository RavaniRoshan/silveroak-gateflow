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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      auth_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_token: string
          student_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
          student_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_tests: {
        Row: {
          attempts: number | null
          average_score: number | null
          best_score: number | null
          created_at: string
          description: string | null
          difficulty: string
          duration: number
          id: string
          is_completed: boolean | null
          last_attempted: string | null
          subjects: string[] | null
          time_limit: number
          title: string
          total_marks: number
          total_questions: number
          updated_at: string
        }
        Insert: {
          attempts?: number | null
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          description?: string | null
          difficulty: string
          duration: number
          id?: string
          is_completed?: boolean | null
          last_attempted?: string | null
          subjects?: string[] | null
          time_limit: number
          title: string
          total_marks: number
          total_questions: number
          updated_at?: string
        }
        Update: {
          attempts?: number | null
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: string
          is_completed?: boolean | null
          last_attempted?: string | null
          subjects?: string[] | null
          time_limit?: number
          title?: string
          total_marks?: number
          total_questions?: number
          updated_at?: string
        }
        Relationships: []
      }
      previous_year_papers: {
        Row: {
          attempts: number | null
          average_score: number | null
          branch: string
          created_at: string
          difficulty: string
          download_count: number | null
          duration: number
          exam_name: string
          file_format: string | null
          file_size: string | null
          has_solutions: boolean | null
          has_video_solutions: boolean | null
          id: string
          is_premium: boolean | null
          paper_code: string
          subjects_covered: string[] | null
          tags: string[] | null
          total_marks: number
          total_questions: number
          updated_at: string
          year: number
        }
        Insert: {
          attempts?: number | null
          average_score?: number | null
          branch: string
          created_at?: string
          difficulty: string
          download_count?: number | null
          duration: number
          exam_name: string
          file_format?: string | null
          file_size?: string | null
          has_solutions?: boolean | null
          has_video_solutions?: boolean | null
          id?: string
          is_premium?: boolean | null
          paper_code: string
          subjects_covered?: string[] | null
          tags?: string[] | null
          total_marks: number
          total_questions: number
          updated_at?: string
          year: number
        }
        Update: {
          attempts?: number | null
          average_score?: number | null
          branch?: string
          created_at?: string
          difficulty?: string
          download_count?: number | null
          duration?: number
          exam_name?: string
          file_format?: string | null
          file_size?: string | null
          has_solutions?: boolean | null
          has_video_solutions?: boolean | null
          id?: string
          is_premium?: boolean | null
          paper_code?: string
          subjects_covered?: string[] | null
          tags?: string[] | null
          total_marks?: number
          total_questions?: number
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      speed_tests: {
        Row: {
          attempts: number | null
          average_accuracy: number | null
          best_score: number | null
          best_time: number | null
          created_at: string
          difficulty: string
          duration: number
          id: string
          is_completed: boolean | null
          subject: string
          title: string
          topic: string
          total_questions: number
          updated_at: string
        }
        Insert: {
          attempts?: number | null
          average_accuracy?: number | null
          best_score?: number | null
          best_time?: number | null
          created_at?: string
          difficulty: string
          duration: number
          id?: string
          is_completed?: boolean | null
          subject: string
          title: string
          topic: string
          total_questions: number
          updated_at?: string
        }
        Update: {
          attempts?: number | null
          average_accuracy?: number | null
          best_score?: number | null
          best_time?: number | null
          created_at?: string
          difficulty?: string
          duration?: number
          id?: string
          is_completed?: boolean | null
          subject?: string
          title?: string
          topic?: string
          total_questions?: number
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          department: string | null
          enrollment_no: string
          first_name: string | null
          id: string
          is_active: boolean
          last_name: string | null
          password_hash: string | null
          updated_at: string
          year_of_study: number | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          enrollment_no: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          password_hash?: string | null
          updated_at?: string
          year_of_study?: number | null
        }
        Update: {
          created_at?: string
          department?: string | null
          enrollment_no?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          password_hash?: string | null
          updated_at?: string
          year_of_study?: number | null
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          average_score_improvement: number | null
          branch: string
          completion_rate: number | null
          created_at: string
          created_by: string | null
          daily_hours: number
          description: string | null
          difficulty_progression: string | null
          duration_days: number
          enrolled_students: number | null
          id: string
          is_popular: boolean | null
          mock_tests_included: number
          price: number | null
          subjects_covered: string[] | null
          tags: string[] | null
          title: string
          total_topics: number
          type: string
          updated_at: string
        }
        Insert: {
          average_score_improvement?: number | null
          branch: string
          completion_rate?: number | null
          created_at?: string
          created_by?: string | null
          daily_hours: number
          description?: string | null
          difficulty_progression?: string | null
          duration_days: number
          enrolled_students?: number | null
          id?: string
          is_popular?: boolean | null
          mock_tests_included: number
          price?: number | null
          subjects_covered?: string[] | null
          tags?: string[] | null
          title: string
          total_topics: number
          type: string
          updated_at?: string
        }
        Update: {
          average_score_improvement?: number | null
          branch?: string
          completion_rate?: number | null
          created_at?: string
          created_by?: string | null
          daily_hours?: number
          description?: string | null
          difficulty_progression?: string | null
          duration_days?: number
          enrolled_students?: number | null
          id?: string
          is_popular?: boolean | null
          mock_tests_included?: number
          price?: number | null
          subjects_covered?: string[] | null
          tags?: string[] | null
          title?: string
          total_topics?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      subject_resources: {
        Row: {
          branch: string
          content_format: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty_level: string
          download_count: number | null
          estimated_duration: string | null
          file_size: string | null
          id: string
          is_featured: boolean | null
          is_free: boolean | null
          learning_outcomes: string[] | null
          prerequisites: string[] | null
          rating: number | null
          subject: string
          tags: string[] | null
          title: string
          total_ratings: number | null
          type: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          branch: string
          content_format?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level: string
          download_count?: number | null
          estimated_duration?: string | null
          file_size?: string | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          learning_outcomes?: string[] | null
          prerequisites?: string[] | null
          rating?: number | null
          subject: string
          tags?: string[] | null
          title: string
          total_ratings?: number | null
          type: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          branch?: string
          content_format?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?: string
          download_count?: number | null
          estimated_duration?: string | null
          file_size?: string | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          learning_outcomes?: string[] | null
          prerequisites?: string[] | null
          rating?: number | null
          subject?: string
          tags?: string[] | null
          title?: string
          total_ratings?: number | null
          type?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      test_results: {
        Row: {
          attempted_at: string
          completed_at: string | null
          completion_percentage: number
          correct_answers: number
          id: string
          incorrect_answers: number
          is_completed: boolean | null
          max_score: number
          questions_attempted: number
          score: number
          student_id: string
          test_id: string
          test_type: string
          time_taken_minutes: number
          total_time_minutes: number
        }
        Insert: {
          attempted_at?: string
          completed_at?: string | null
          completion_percentage: number
          correct_answers: number
          id?: string
          incorrect_answers: number
          is_completed?: boolean | null
          max_score: number
          questions_attempted: number
          score: number
          student_id: string
          test_id: string
          test_type: string
          time_taken_minutes: number
          total_time_minutes: number
        }
        Update: {
          attempted_at?: string
          completed_at?: string | null
          completion_percentage?: number
          correct_answers?: number
          id?: string
          incorrect_answers?: number
          is_completed?: boolean | null
          max_score?: number
          questions_attempted?: number
          score?: number
          student_id?: string
          test_id?: string
          test_type?: string
          time_taken_minutes?: number
          total_time_minutes?: number
        }
        Relationships: [
          {
            foreignKeyName: "test_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
