import { useState } from "react";
import { Search, GraduationCap, FileText, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const teachers = [
  {
    id: 1,
    name: "Mr M",
    subject: "Mathematics",
    students: [
      { id: 1, name: "Emma Johnson", grade: "A" },
      { id: 2, name: "Liam Williams", grade: "B+" },
      { id: 3, name: "Olivia Brown", grade: "A-" },
    ],
  },
  {
    id: 2,
    name: "Mr N",
    subject: "Science",
    students: [
      { id: 4, name: "Noah Davis", grade: "B" },
      { id: 5, name: "Ava Martinez", grade: "A" },
      { id: 6, name: "Sophia Garcia", grade: "B+" },
    ],
  },
  {
    id: 3,
    name: "Mrs B",
    subject: "English Literature",
    students: [
      { id: 7, name: "Isabella Rodriguez", grade: "A" },
      { id: 8, name: "Mason Wilson", grade: "B" },
      { id: 9, name: "Mia Anderson", grade: "A-" },
    ],
  },
  {
    id: 4,
    name: "Mrs F",
    subject: "History",
    students: [
      { id: 10, name: "James Taylor", grade: "B+" },
      { id: 11, name: "Charlotte Thomas", grade: "A" },
      { id: 12, name: "Benjamin Moore", grade: "B" },
    ],
  },
  {
    id: 5,
    name: "Mrs S",
    subject: "Art & Design",
    students: [
      { id: 13, name: "Amelia Jackson", grade: "A" },
      { id: 14, name: "Lucas Martin", grade: "A-" },
      { id: 15, name: "Harper Lee", grade: "B+" },
    ],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; teacher: string; subject: string } | null>(null);
  const [report, setReport] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    const query = searchQuery.toLowerCase();
    const teacherMatch = teacher.name.toLowerCase().includes(query);
    const studentMatch = teacher.students.some((student) =>
      student.name.toLowerCase().includes(query)
    );
    return teacherMatch || studentMatch;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Grade Manager
              </h1>
              <p className="text-sm text-muted-foreground">Track and manage student reports</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by teacher or student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/60 border-border/50 focus:border-primary transition-all"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">{teacher.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="font-medium">
                        {teacher.subject}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Students ({teacher.students.length})</p>
                  {teacher.students.map((student) => (
                    <Dialog key={student.id}>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setSelectedStudent({ 
                            name: student.name, 
                            teacher: teacher.name,
                            subject: teacher.subject 
                          })}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 group"
                        >
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {student.name}
                          </span>
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 font-semibold">
                            {student.grade}
                          </Badge>
                        </button>
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
                              <p className="font-semibold text-foreground">{teacher.name}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Subject</Label>
                              <p className="font-semibold text-foreground">{teacher.subject}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Current Grade</Label>
                              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                                {student.grade}
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
                            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Send Report
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">Try searching for a different teacher or student name</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
