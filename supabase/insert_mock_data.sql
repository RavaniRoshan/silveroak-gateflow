-- Insert Mock Data for Extended GATE CLUB Platform
-- Execute this script AFTER running the complete_migration.sql
-- This file contains sample data for testing and development

-- Insert Mock Tests (only if not exists)
INSERT INTO public.mock_tests (title, description, duration, total_questions, total_marks, difficulty, subjects, attempts, average_score, best_score, last_attempted, is_completed, time_limit) 
SELECT 'GATE 2024 Full Mock Test - Set 1', 'Complete GATE pattern test covering all subjects', 180, 65, 100, 'Medium', ARRAY['Data Structures', 'Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks'], 1250, 68.5, 85.2, '2024-01-15T10:30:00Z', true, 180
WHERE NOT EXISTS (SELECT 1 FROM public.mock_tests WHERE title = 'GATE 2024 Full Mock Test - Set 1');

INSERT INTO public.mock_tests (title, description, duration, total_questions, total_marks, difficulty, subjects, attempts, average_score, best_score, last_attempted, is_completed, time_limit) 
SELECT 'GATE 2024 Full Mock Test - Set 2', 'Advanced level mock test with recent pattern', 180, 65, 100, 'Hard', ARRAY['Theory of Computation', 'Compiler Design', 'Computer Architecture', 'Engineering Mathematics'], 890, 62.3, 78.9, '2024-01-12T14:15:00Z', false, 180
WHERE NOT EXISTS (SELECT 1 FROM public.mock_tests WHERE title = 'GATE 2024 Full Mock Test - Set 2');

INSERT INTO public.mock_tests (title, description, duration, total_questions, total_marks, difficulty, subjects, attempts, average_score, best_score, last_attempted, is_completed, time_limit) 
SELECT 'Subject-wise Mock Test - DSA', 'Focused test on Data Structures and Algorithms', 90, 30, 50, 'Medium', ARRAY['Data Structures', 'Algorithms'], 2100, 72.1, 92.5, '2024-01-10T09:45:00Z', true, 90
WHERE NOT EXISTS (SELECT 1 FROM public.mock_tests WHERE title = 'Subject-wise Mock Test - DSA');

INSERT INTO public.mock_tests (title, description, duration, total_questions, total_marks, difficulty, subjects, attempts, average_score, best_score, last_attempted, is_completed, time_limit) 
SELECT 'Computer Science Core Concepts', 'Test covering fundamental CS subjects', 120, 45, 75, 'Medium', ARRAY['Programming', 'Digital Logic', 'Computer Organization'], 1560, 65.8, 88.3, '2024-01-08T16:20:00Z', true, 120
WHERE NOT EXISTS (SELECT 1 FROM public.mock_tests WHERE title = 'Computer Science Core Concepts');

INSERT INTO public.mock_tests (title, description, duration, total_questions, total_marks, difficulty, subjects, attempts, average_score, best_score, last_attempted, is_completed, time_limit) 
SELECT 'GATE Mathematics Special', 'Mathematics and aptitude focused test', 90, 35, 50, 'Hard', ARRAY['Engineering Mathematics', 'General Aptitude'], 980, 58.4, 82.1, '2024-01-05T11:10:00Z', false, 90
WHERE NOT EXISTS (SELECT 1 FROM public.mock_tests WHERE title = 'GATE Mathematics Special');

-- Insert Speed Tests (only if not exists)
INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'Quick Sort Implementation', 'Data Structures', 'Sorting Algorithms', 15, 10, 'Easy', 3450, 420, 90.0, 85.2, true
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'Quick Sort Implementation');

INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'Binary Tree Traversals', 'Data Structures', 'Trees', 20, 15, 'Medium', 2780, 850, 87.5, 78.6, true
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'Binary Tree Traversals');

INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'Dynamic Programming Basics', 'Algorithms', 'Dynamic Programming', 25, 12, 'Hard', 1560, 1200, 75.0, 65.3, false
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'Dynamic Programming Basics');

INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'Process Scheduling Quiz', 'Operating Systems', 'CPU Scheduling', 10, 8, 'Medium', 2100, 380, 95.0, 88.7, true
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'Process Scheduling Quiz');

INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'SQL Query Optimization', 'Database Management Systems', 'Query Optimization', 20, 12, 'Hard', 890, 1050, 82.5, 71.2, true
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'SQL Query Optimization');

INSERT INTO public.speed_tests (title, subject, topic, duration, total_questions, difficulty, attempts, best_time, best_score, average_accuracy, is_completed) 
SELECT 'Network Protocol Basics', 'Computer Networks', 'Network Protocols', 12, 10, 'Easy', 1890, 495, 92.0, 86.4, true
WHERE NOT EXISTS (SELECT 1 FROM public.speed_tests WHERE title = 'Network Protocol Basics');

-- Insert Previous Year Papers (only if not exists)
INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2023, 'GATE 2023', 'Computer Science', 'GATE2023CS', 65, 100, 180, 'Hard', ARRAY['Data Structures', 'Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Engineering Mathematics'], 2500, 67.8, 1200, '4.2MB', 'PDF', true, true, true, ARRAY['previous-year', 'gate', '2023', 'computer-science']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2023CS');

INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2022, 'GATE 2022', 'Computer Science', 'GATE2022CS', 65, 100, 180, 'Medium', ARRAY['Programming', 'Data Structures', 'Algorithms', 'Theory of Computation', 'Computer Architecture'], 3200, 72.1, 1800, '3.8MB', 'PDF', true, true, true, ARRAY['previous-year', 'gate', '2022', 'computer-science']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2022CS');

INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2021, 'GATE 2021', 'Computer Science', 'GATE2021CS', 65, 100, 180, 'Medium', ARRAY['Software Engineering', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Digital Logic'], 4100, 69.5, 2100, '4.1MB', 'PDF', true, false, false, ARRAY['previous-year', 'gate', '2021', 'computer-science']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2021CS');

INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2023, 'GATE 2023', 'Mechanical Engineering', 'GATE2023ME', 65, 100, 180, 'Hard', ARRAY['Engineering Mechanics', 'Strength of Materials', 'Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'], 1800, 65.2, 900, '4.5MB', 'PDF', true, true, true, ARRAY['previous-year', 'gate', '2023', 'mechanical']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2023ME');

INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2022, 'GATE 2022', 'Electrical Engineering', 'GATE2022EE', 65, 100, 180, 'Medium', ARRAY['Electric Circuits', 'Electromagnetic Fields', 'Signals and Systems', 'Electrical Machines', 'Power Systems'], 2200, 68.9, 1100, '3.9MB', 'PDF', true, true, true, ARRAY['previous-year', 'gate', '2022', 'electrical']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2022EE');

INSERT INTO public.previous_year_papers (year, exam_name, branch, paper_code, total_questions, total_marks, duration, difficulty, subjects_covered, download_count, average_score, attempts, file_size, file_format, has_solutions, has_video_solutions, is_premium, tags) 
SELECT 2020, 'GATE 2020', 'Computer Science', 'GATE2020CS', 65, 100, 180, 'Medium', ARRAY['Data Structures', 'Algorithms', 'Programming', 'Computer Organization', 'Engineering Mathematics'], 5200, 71.3, 2800, '3.7MB', 'PDF', true, false, false, ARRAY['previous-year', 'gate', '2020', 'computer-science']
WHERE NOT EXISTS (SELECT 1 FROM public.previous_year_papers WHERE paper_code = 'GATE2020CS');

-- Insert Subject Resources (only if not exists)
INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Data Structures Complete Notes', 'Data Structures', 'Computer Science', 'lecture_notes', 'Comprehensive notes covering all data structure concepts with examples', 'PDF', 'Intermediate', '120 minutes', '8.5MB', 1500, 4.7, 185, true, ARRAY['Programming Basics'], ARRAY['Understand array operations', 'Master linked list manipulations', 'Implement trees and graphs'], 'Dr. Prof. Sharma', 5200, true, ARRAY['data-structures', 'computer-science', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Data Structures Complete Notes');

INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Algorithm Analysis Video Series', 'Algorithms', 'Computer Science', 'video_lectures', 'Step-by-step video explanations of algorithm design and analysis', 'MP4', 'Advanced', '180 minutes', '25.3MB', 980, 4.8, 124, false, ARRAY['Data Structures'], ARRAY['Analyze algorithm complexity', 'Design efficient algorithms', 'Solve optimization problems'], 'Prof. Patel', 3800, true, ARRAY['algorithms', 'video-lectures', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Algorithm Analysis Video Series');

INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Operating Systems Practice Problems', 'Operating Systems', 'Computer Science', 'practice_problems', 'Collection of solved and unsolved OS problems for GATE preparation', 'PDF', 'Intermediate', '90 minutes', '12.1MB', 2100, 4.6, 267, true, ARRAY['Computer Systems'], ARRAY['Understand process management', 'Master memory management concepts', 'Solve synchronization problems'], 'Dr. Kumar', 6500, false, ARRAY['operating-systems', 'practice-problems', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Operating Systems Practice Problems');

INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Database Quick Revision Notes', 'Database Management Systems', 'Computer Science', 'quick_revision', 'Concise revision notes with important formulas and concepts', 'PDF', 'Beginner', '45 minutes', '3.2MB', 3200, 4.5, 412, true, ARRAY[], ARRAY['Recall DBMS concepts quickly', 'Review normalization rules', 'Remember SQL syntax'], 'Prof. Singh', 8900, true, ARRAY['database', 'quick-revision', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Database Quick Revision Notes');

INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Computer Networks Formula Sheet', 'Computer Networks', 'Computer Science', 'formula_sheets', 'Essential formulas and protocols for network calculations', 'PDF', 'Intermediate', '30 minutes', '1.8MB', 2800, 4.4, 198, true, ARRAY['Network Basics'], ARRAY['Apply network formulas', 'Calculate transmission parameters', 'Understand protocol specifications'], 'Dr. Prof. Sharma', 4200, false, ARRAY['computer-networks', 'formulas', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Computer Networks Formula Sheet');

INSERT INTO public.subject_resources (title, subject, branch, type, description, content_format, difficulty_level, estimated_duration, file_size, download_count, rating, total_ratings, is_free, prerequisites, learning_outcomes, created_by, view_count, is_featured, tags) 
SELECT 'Thermodynamics Solved Examples', 'Thermodynamics', 'Mechanical Engineering', 'solved_examples', 'Step-by-step solutions to thermodynamics problems', 'PDF', 'Advanced', '150 minutes', '15.7MB', 1200, 4.9, 87, false, ARRAY['Engineering Mathematics', 'Physics'], ARRAY['Solve thermodynamic cycles', 'Apply energy conservation', 'Analyze heat transfer'], 'Prof. Wilson', 2100, true, ARRAY['thermodynamics', 'mechanical', 'solved-examples']
WHERE NOT EXISTS (SELECT 1 FROM public.subject_resources WHERE title = 'Thermodynamics Solved Examples');

-- Insert Study Plans (only if not exists)
INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'Computer Science - 120 Day Complete', 'Computer Science', '120_day_complete', 120, 'Comprehensive 4-month study plan covering all CS subjects for GATE', ARRAY['Data Structures', 'Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Programming', 'Digital Logic', 'Computer Architecture', 'Theory of Computation', 'Compiler Design'], 6, 145, 20, 'Easy to Hard', 1999, 850, 78.5, 28.3, 'GATE CLUB Faculty Team', true, ARRAY['computer-science', 'study-plan', 'gate-preparation', '120_day_complete']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'Computer Science - 120 Day Complete');

INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'Computer Science - 60 Day Comprehensive', 'Computer Science', '60_day_comprehensive', 60, 'Intensive 2-month preparation plan for CS GATE aspirants', ARRAY['Data Structures', 'Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Engineering Mathematics'], 8, 85, 15, 'Easy to Hard', 1499, 1200, 82.1, 24.7, 'GATE CLUB Faculty Team', true, ARRAY['computer-science', 'study-plan', 'gate-preparation', '60_day_comprehensive']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'Computer Science - 60 Day Comprehensive');

INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'Mechanical Engineering - 120 Day Complete', 'Mechanical Engineering', '120_day_complete', 120, 'Complete mechanical engineering preparation for GATE exam', ARRAY['Engineering Mechanics', 'Strength of Materials', 'Theory of Machines', 'Vibrations', 'Machine Design', 'Fluid Mechanics', 'Heat Transfer', 'Thermodynamics', 'Manufacturing', 'Industrial Engineering'], 6, 135, 18, 'Easy to Hard', 1999, 620, 75.8, 26.9, 'GATE CLUB Faculty Team', false, ARRAY['mechanical-engineering', 'study-plan', 'gate-preparation', '120_day_complete']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'Mechanical Engineering - 120 Day Complete');

INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'Data Structures & Algorithms Intensive', 'Computer Science', 'subject_wise_intensive', 45, 'Focused preparation plan for DSA subjects', ARRAY['Data Structures', 'Algorithms'], 5, 65, 12, 'Easy to Hard', 999, 1800, 85.2, 32.1, 'GATE CLUB Faculty Team', true, ARRAY['computer-science', 'dsa', 'subject-intensive', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'Data Structures & Algorithms Intensive');

INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'GATE Revision Bootcamp', 'Computer Science', 'revision_bootcamp', 21, 'Quick revision plan for final preparation', ARRAY['Data Structures', 'Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks'], 4, 45, 8, 'Medium to Hard', 0, 2100, 89.5, 18.4, 'GATE CLUB Faculty Team', true, ARRAY['computer-science', 'revision', 'bootcamp', 'gate-preparation']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'GATE Revision Bootcamp');

INSERT INTO public.study_plans (title, branch, type, duration_days, description, subjects_covered, daily_hours, total_topics, mock_tests_included, difficulty_progression, price, enrolled_students, completion_rate, average_score_improvement, created_by, is_popular, tags) 
SELECT 'Electrical Engineering - 60 Day Comprehensive', 'Electrical Engineering', '60_day_comprehensive', 60, 'Comprehensive EE preparation plan for GATE', ARRAY['Electric Circuits', 'Electromagnetic Fields', 'Signals and Systems', 'Electrical Machines', 'Power Electronics', 'Control Systems', 'Power Systems'], 7, 90, 16, 'Easy to Hard', 1499, 450, 79.3, 25.6, 'GATE CLUB Faculty Team', false, ARRAY['electrical-engineering', 'study-plan', 'gate-preparation', '60_day_comprehensive']
WHERE NOT EXISTS (SELECT 1 FROM public.study_plans WHERE title = 'Electrical Engineering - 60 Day Comprehensive');

-- Insert some test results for existing students (only if students exist)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.students LIMIT 1) THEN
        INSERT INTO public.test_results (student_id, test_id, test_type, score, max_score, completion_percentage, time_taken_minutes, total_time_minutes, questions_attempted, correct_answers, incorrect_answers, attempted_at, completed_at, is_completed)
        SELECT 
          s.id,
          mt.id,
          'mock_test',
          ROUND((RANDOM() * 40 + 50)::numeric, 2), -- Random score between 50-90
          mt.total_marks,
          ROUND((RANDOM() * 30 + 70)::numeric, 2), -- Random completion between 70-100%
          ROUND((mt.duration * (0.7 + RANDOM() * 0.3))::numeric, 2), -- Random time between 70-100% of duration
          mt.duration,
          FLOOR(mt.total_questions * (0.7 + RANDOM() * 0.3)), -- Random questions attempted
          FLOOR(mt.total_questions * (0.5 + RANDOM() * 0.4)), -- Random correct answers
          FLOOR(mt.total_questions * (0.1 + RANDOM() * 0.2)), -- Random incorrect answers
          NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 30), -- Random date within last 30 days
          CASE WHEN RANDOM() > 0.3 THEN NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 30) ELSE NULL END,
          RANDOM() > 0.3
        FROM public.students s
        CROSS JOIN (SELECT id, total_marks, duration, total_questions FROM public.mock_tests LIMIT 3) mt
        WHERE s.is_active = true
        AND NOT EXISTS (SELECT 1 FROM public.test_results WHERE student_id = s.id AND test_id = mt.id)
        LIMIT 15;

        -- Insert speed test results
        INSERT INTO public.test_results (student_id, test_id, test_type, score, max_score, completion_percentage, time_taken_minutes, total_time_minutes, questions_attempted, correct_answers, incorrect_answers, attempted_at, completed_at, is_completed)
        SELECT 
          s.id,
          st.id,
          'speed_test',
          ROUND((RANDOM() * 30 + 60)::numeric, 2), -- Random score between 60-90
          100,
          ROUND((RANDOM() * 20 + 80)::numeric, 2), -- Random completion between 80-100%
          ROUND((st.duration * (0.6 + RANDOM() * 0.4))::numeric, 2), -- Random time between 60-100% of duration
          st.duration,
          FLOOR(st.total_questions * (0.8 + RANDOM() * 0.2)), -- Random questions attempted
          FLOOR(st.total_questions * (0.6 + RANDOM() * 0.3)), -- Random correct answers
          FLOOR(st.total_questions * (0.05 + RANDOM() * 0.15)), -- Random incorrect answers
          NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 20), -- Random date within last 20 days
          CASE WHEN RANDOM() > 0.2 THEN NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 20) ELSE NULL END,
          RANDOM() > 0.2
        FROM public.students s
        CROSS JOIN (SELECT id, duration, total_questions FROM public.speed_tests LIMIT 3) st
        WHERE s.is_active = true
        AND NOT EXISTS (SELECT 1 FROM public.test_results WHERE student_id = s.id AND test_id = st.id)
        LIMIT 12;
    END IF;
END $$;