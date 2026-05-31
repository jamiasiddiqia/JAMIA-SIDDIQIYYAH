"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Save, 
  Trash2, 
  Plus, 
  Loader2, 
  CheckCircle,
  PlayCircle
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  level: string;
  duration: string;
  teacher_id: string;
  price: number;
}

export default function AcademyManager() {
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState("courses");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Forms inputs
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseLevel, setCourseLevel] = useState("beginner");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseTeacherId, setCourseTeacherId] = useState("");
  const [coursePrice, setCoursePrice] = useState("0");

  const [teacherName, setTeacherName] = useState("");
  const [teacherTitle, setTeacherTitle] = useState("");
  const [teacherRole, setTeacherRole] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: teacherData } = await supabase.from("teachers").select("id, name, title");
      const { data: courseData } = await supabase.from("courses").select("id, title, slug, level, duration, teacher_id, price");
      
      if (teacherData) setTeachers(teacherData);
      if (courseData) setCourses(courseData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("courses")
        .insert({
          title: courseTitle,
          slug: courseSlug,
          level: courseLevel,
          duration: courseDuration,
          teacher_id: courseTeacherId || null,
          price: Number(coursePrice)
        });

      if (!error) {
        setMessage("Course added successfully!");
        setCourseTitle("");
        setCourseSlug("");
        setCourseDuration("");
        setCoursePrice("0");
        fetchData();
      }
      setActionLoading(false);
    } catch (err) {
      setActionLoading(false);
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("teachers")
        .insert({
          name: teacherName,
          title: teacherTitle,
          role: teacherRole
        });

      if (!error) {
        setMessage("Teacher Profile created successfully!");
        setTeacherName("");
        setTeacherTitle("");
        setTeacherRole("");
        fetchData();
      }
      setActionLoading(false);
    } catch (err) {
      setActionLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Permanently delete this course?")) return;
    try {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (!error) fetchData();
    } catch (err) {}
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!window.confirm("Permanently delete this teacher?")) return;
    try {
      const { error } = await supabase.from("teachers").delete().eq("id", id);
      if (!error) fetchData();
    } catch (err) {}
  };

  return (
    <div className="space-y-8">
      {/* Academy tab headers */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-primary text-base italic">Sacred Online Academy LMS</h4>
          <p className="text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-widest">
            Manage classical curricula, lessons modules, student access lists and faculty deans assignments.
          </p>
        </div>

        <div className="flex gap-2">
          {["courses", "scholars"].map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setActiveSubTab(sub);
                setMessage("");
              }}
              className={`px-4.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeSubTab === sub
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background-warm text-primary border border-primary/5 hover:bg-primary/5"
              }`}
            >
              {sub} list
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List Column */}
          <div className="lg:col-span-2 space-y-6">
            {activeSubTab === "courses" ? (
              <div className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-primary/5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h4 className="font-display font-bold text-primary italic text-base">Academy Courses Catalog</h4>
                </div>

                {courses.length === 0 ? (
                  <div className="py-20 text-center text-xs font-bold text-on-surface-variant/40 uppercase">
                    No Academy courses registered.
                  </div>
                ) : (
                  <div className="divide-y divide-primary/5">
                    {courses.map((course) => (
                      <div key={course.id} className="p-6 flex items-center justify-between hover:bg-primary/[0.005]">
                        <div className="space-y-1">
                          <p className="font-bold text-primary text-xs">{course.title}</p>
                          <div className="flex items-center gap-2 text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-wider">
                            <span>Slug: {course.slug}</span>
                            <span>•</span>
                            <span>Level: {course.level}</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-primary/5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <h4 className="font-display font-bold text-primary italic text-base">Senior Scholars Registry</h4>
                </div>

                {teachers.length === 0 ? (
                  <div className="py-20 text-center text-xs font-bold text-on-surface-variant/40 uppercase">
                    No faculty deans registered.
                  </div>
                ) : (
                  <div className="divide-y divide-primary/5">
                    {teachers.map((t) => (
                      <div key={t.id} className="p-6 flex items-center justify-between hover:bg-primary/[0.005]">
                        <div className="space-y-0.5">
                          <p className="font-bold text-primary text-xs">{t.name}</p>
                          <span className="block text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-wider">
                            {t.title}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteTeacher(t.id)}
                          className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add Module Column Form */}
          <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm h-fit space-y-6">
            <div className="border-b border-primary/5 pb-4.5 flex items-center gap-2">
              <Plus className="w-4.5 h-4.5 text-primary" />
              <h4 className="font-display font-bold text-primary italic text-base">
                Create {activeSubTab === "courses" ? "Course" : "Teacher Profile"}
              </h4>
            </div>

            {activeSubTab === "courses" ? (
              <form onSubmit={handleAddCourse} className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dars-e-Nizami Year 1"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Unique slug path</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dars-e-nizami-1"
                    value={courseSlug}
                    onChange={(e) => setCourseSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 Years, 240 Classes"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Difficulty level</label>
                  <select
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl uppercase tracking-wider focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Assign Teacher</label>
                  <select
                    value={courseTeacherId}
                    onChange={(e) => setCourseTeacherId(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl uppercase tracking-wider focus:outline-none"
                  >
                    <option value="">Select Instructor...</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-primary text-white py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Course"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddTeacher} className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Teacher Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maulana Yousuf Al-Hadidi"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Professional Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mufti & Senior Jurist"
                    value={teacherTitle}
                    onChange={(e) => setTeacherTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Institutional Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DEAN OF SHARIAH LAW"
                    value={teacherRole}
                    onChange={(e) => setTeacherRole(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-primary text-white py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Teacher Profile"}
                </button>
              </form>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
