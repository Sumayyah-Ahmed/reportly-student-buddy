import { useState } from "react";
import { Search, FileText, User, Send, Plus, ChevronDown, Download, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: number;
  name: string;
  class: string;
  email?: string;
  contact?: string;
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
        email: "emma.johnson@school.edu",
        contact: "000-000-0000",
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
  const [selectedTeacherId, setSelectedTeacherId] = useState<number>(teachers[0].id);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [report, setReport] = useState("");
  const [comments, setComments] = useState("");

  const selectedTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

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

  const handleDownloadPDF = () => {
    toast.success("PDF downloaded successfully!");
  };

  const handleSendEmail = (student: Student) => {
    if (student.email) {
      toast.success(`Report sent to ${student.email}!`);
    } else {
      toast.info("No email available for this student");
    }
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
                <Select value={selectedTeacherId.toString()} onValueChange={(value) => setSelectedTeacherId(Number(value))}>
                  <SelectTrigger className="w-[250px] h-auto border-0 p-0 focus:ring-0 hover:bg-transparent">
                    <div className="text-left">
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                        <SelectValue />
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {selectedTeacher.class} - {selectedTeacher.students.length} Students
                      </p>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{teacher.name}</span>
                          <span className="text-muted-foreground text-sm">- {teacher.class}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-5">
                <div className="space-y-3">
                  {/* Student Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-bold text-foreground">{student.name}</h3>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                        {student.contact && (
                          <p className="text-xs text-muted-foreground">{student.contact}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={`${getPercentageBadgeColor(student.overallPercentage)} font-semibold px-2.5 py-0.5 text-sm`}>
                      {student.overallPercentage.toFixed(1)}%
                    </Badge>
                  </div>

                  {/* Attendance */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-muted-foreground">Attendance</span>
                    <Badge className={`${getAttendanceBadgeColor(student.attendance.status)} font-medium text-sm px-3 py-0.5`}>
                      {student.attendance.status}
                    </Badge>
                  </div>

                  {/* Subject Scores */}
                  <div className="space-y-1.5 pt-1">
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
                  <div className="flex gap-2.5 pt-3">
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
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
                        <DialogHeader className="border-b pb-4">
                          <DialogTitle className="text-xl font-bold">Student Report Card</DialogTitle>
                          <p className="text-sm text-muted-foreground">Detailed academic report for {student.name}</p>
                        </DialogHeader>
                        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
                          <div className="space-y-6 py-4">
                            {/* Student Info */}
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-2xl font-bold text-foreground">{student.name}</h3>
                                <p className="text-muted-foreground">{student.class}</p>
                              </div>
                              <Badge className={`${getPercentageBadgeColor(student.overallPercentage)} text-lg px-4 py-1`}>
                                {student.overallPercentage.toFixed(1)}%
                              </Badge>
                            </div>

                            {/* Attendance */}
                            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
                              <h4 className="font-semibold text-foreground">Attendance</h4>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Overall Attendance Status</span>
                                <Badge className={`${getAttendanceBadgeColor(student.attendance.status)}`}>
                                  {student.attendance.status}
                                </Badge>
                              </div>
                            </div>

                            {/* Subject Breakdown */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-foreground">Subject Breakdown</h4>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-foreground">Mathematics</span>
                                  <Badge className={`${getPercentageBadgeColor(student.subjects.mathematics)}`}>
                                    {student.subjects.mathematics}%
                                  </Badge>
                                </div>
                                <Progress value={student.subjects.mathematics} className="h-2" />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-foreground">Science</span>
                                  <Badge className={`${getPercentageBadgeColor(student.subjects.science)}`}>
                                    {student.subjects.science}%
                                  </Badge>
                                </div>
                                <Progress value={student.subjects.science} className="h-2" />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-foreground">English</span>
                                  <Badge className={`${getPercentageBadgeColor(student.subjects.english)}`}>
                                    {student.subjects.english}%
                                  </Badge>
                                </div>
                                <Progress value={student.subjects.english} className="h-2" />
                              </div>
                            </div>

                            {/* Overall Performance */}
                            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
                              <h4 className="font-semibold text-foreground">Overall Performance</h4>
                              <p className="text-sm text-muted-foreground">
                                {student.overallPercentage >= 90 
                                  ? "Excellent performance. Continue the good work!"
                                  : student.overallPercentage >= 80
                                  ? "Very good performance. Keep up the effort!"
                                  : "Good performance. There's room for improvement."}
                              </p>
                            </div>

                            {/* Additional Comments */}
                            <div className="space-y-2">
                              <Label htmlFor="comments" className="text-sm font-semibold">Additional Comments</Label>
                              <Textarea
                                id="comments"
                                placeholder="Add any additional comments or observations about the student..."
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="min-h-[100px] resize-none"
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              <Button 
                                onClick={handleDownloadPDF}
                                variant="outline"
                                className="flex-1"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </Button>
                              <Button 
                                onClick={() => handleSendEmail(student)}
                                className="flex-1 bg-primary hover:bg-primary/90"
                                disabled={!student.email}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                {student.email ? "Send Report" : "No Email Available"}
                              </Button>
                            </div>
                          </div>
                        </ScrollArea>
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
