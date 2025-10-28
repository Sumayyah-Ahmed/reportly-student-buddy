import { useState } from "react";
import { Search, FileText, User, Send, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  id: number;
  name: string;
  class: string;
  overallPercentage: number;
  attendance: {
    status: "Good" | "Ok" | "Poor";
    percentage: number;
  };
  subjects: {
    mathematics: number;
    science: number;
    english: number;
  };
}

interface Teacher {
  id: number;
  name: string;
  class: string;
  avatar?: string;
  students: Student[];
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Mr M",
    class: "Class 3A",
    students: [
      {
        id: 1,
        name: "Emma Johnson",
        class: "Class 3A",
        overallPercentage: 94.5,
        attendance: { status: "Good", percentage: 95.0 },
        subjects: { mathematics: 96, science: 94, english: 94 },
      },
      {
        id: 2,
        name: "Liam Williams",
        class: "Class 3A",
        overallPercentage: 87.0,
        attendance: { status: "Ok", percentage: 88.0 },
        subjects: { mathematics: 89, science: 86, english: 86 },
      },
      {
        id: 3,
        name: "Olivia Brown",
        class: "Class 3A",
        overallPercentage: 91.3,
        attendance: { status: "Good", percentage: 93.0 },
        subjects: { mathematics: 93, science: 90, english: 91 },
      },
    ],
  },
  {
    id: 2,
    name: "Mr N",
    class: "Class 4B",
    students: [
      {
        id: 4,
        name: "Noah Davis",
        class: "Class 4B",
        overallPercentage: 85.7,
        attendance: { status: "Ok", percentage: 86.0 },
        subjects: { mathematics: 87, science: 85, english: 85 },
      },
      {
        id: 5,
        name: "Ava Martinez",
        class: "Class 4B",
        overallPercentage: 93.7,
        attendance: { status: "Good", percentage: 95.0 },
        subjects: { mathematics: 95, science: 93, english: 93 },
      },
      {
        id: 6,
        name: "Sophia Garcia",
        class: "Class 4B",
        overallPercentage: 88.3,
        attendance: { status: "Ok", percentage: 89.0 },
        subjects: { mathematics: 90, science: 87, english: 88 },
      },
    ],
  },
  {
    id: 3,
    name: "Mrs B",
    class: "Class 5A",
    students: [
      {
        id: 7,
        name: "Isabella Rodriguez",
        class: "Class 5A",
        overallPercentage: 95.0,
        attendance: { status: "Good", percentage: 96.0 },
        subjects: { mathematics: 96, science: 95, english: 94 },
      },
      {
        id: 8,
        name: "Mason Wilson",
        class: "Class 5A",
        overallPercentage: 84.3,
        attendance: { status: "Ok", percentage: 85.0 },
        subjects: { mathematics: 86, science: 83, english: 84 },
      },
      {
        id: 9,
        name: "Mia Anderson",
        class: "Class 5A",
        overallPercentage: 90.7,
        attendance: { status: "Good", percentage: 92.0 },
        subjects: { mathematics: 92, science: 90, english: 90 },
      },
    ],
  },
  {
    id: 4,
    name: "Mrs F",
    class: "Class 6C",
    students: [
      {
        id: 10,
        name: "James Taylor",
        class: "Class 6C",
        overallPercentage: 89.0,
        attendance: { status: "Good", percentage: 90.0 },
        subjects: { mathematics: 91, science: 88, english: 88 },
      },
      {
        id: 11,
        name: "Charlotte Thomas",
        class: "Class 6C",
        overallPercentage: 94.3,
        attendance: { status: "Good", percentage: 95.0 },
        subjects: { mathematics: 96, science: 93, english: 94 },
      },
      {
        id: 12,
        name: "Benjamin Moore",
        class: "Class 6C",
        overallPercentage: 86.0,
        attendance: { status: "Ok", percentage: 87.0 },
        subjects: { mathematics: 88, science: 85, english: 85 },
      },
    ],
  },
  {
    id: 5,
    name: "Mrs S",
    class: "Class 7D",
    students: [
      {
        id: 13,
        name: "Amelia Jackson",
        class: "Class 7D",
        overallPercentage: 95.7,
        attendance: { status: "Good", percentage: 97.0 },
        subjects: { mathematics: 97, science: 95, english: 95 },
      },
      {
        id: 14,
        name: "Lucas Martin",
        class: "Class 7D",
        overallPercentage: 91.0,
        attendance: { status: "Good", percentage: 92.0 },
        subjects: { mathematics: 93, science: 90, english: 90 },
      },
      {
        id: 15,
        name: "Harper Lee",
        class: "Class 7D",
        overallPercentage: 88.7,
        attendance: { status: "Ok", percentage: 89.0 },
        subjects: { mathematics: 90, science: 88, english: 88 },
      },
    ],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher] = useState<Teacher>(teachers[0]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [report, setReport] = useState("");

  const filteredStudents = selectedTeacher.students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return student.name.toLowerCase().includes(query);
  });

  const handleSendReport = () => {
    if (!report.trim()) {
      toast.error("Please write a report before sending");
      return;
    }
    toast.success(`Report sent for ${selectedStudent?.name}!`);
    setReport("");
    setSelectedStudent(null);
  };

  const getAttendanceBadgeColor = (status: string) => {
    if (status === "Good") return "bg-success text-success-foreground";
    if (status === "Ok") return "bg-accent text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getPercentageBadgeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-success text-success-foreground";
    if (percentage >= 80) return "bg-accent text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={selectedTeacher.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {selectedTeacher.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedTeacher.class} - {selectedTeacher.students.length} Students
                </p>
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Student Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 bg-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    <Badge className={`${getPercentageBadgeColor(student.overallPercentage)} font-semibold px-3 py-1`}>
                      {student.overallPercentage.toFixed(1)}%
                    </Badge>
                  </div>

                  {/* Attendance */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Attendance</span>
                    <Badge className={`${getAttendanceBadgeColor(student.attendance.status)} font-medium`}>
                      {student.attendance.status}
                    </Badge>
                  </div>

                  {/* Subject Scores */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Mathematics</span>
                      <span className="text-sm font-bold text-foreground">{student.subjects.mathematics}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Science</span>
                      <span className="text-sm font-bold text-foreground">{student.subjects.science}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">English</span>
                      <span className="text-sm font-bold text-foreground">{student.subjects.english}%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Create Report for {student.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Teacher</Label>
                              <p className="font-semibold text-foreground">{selectedTeacher.name}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Class</Label>
                              <p className="font-semibold text-foreground">{student.class}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Overall</Label>
                              <Badge className={`${getPercentageBadgeColor(student.overallPercentage)}`}>
                                {student.overallPercentage.toFixed(1)}%
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Attendance</Label>
                              <Badge className={`${getAttendanceBadgeColor(student.attendance.status)}`}>
                                {student.attendance.status}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="report" className="text-sm font-semibold">Report Content</Label>
                            <Textarea
                              id="report"
                              placeholder="Write your detailed report about the student's progress, behavior, and achievements..."
                              value={report}
                              onChange={(e) => setReport(e.target.value)}
                              className="min-h-[150px] mt-2 resize-none"
                            />
                          </div>
                          <Button 
                            onClick={handleSendReport}
                            className="w-full bg-primary hover:bg-primary/90"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Report
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        toast.success(`Report sent for ${student.name}!`);
                      }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try searching with a different name</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
