import React, { useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import AddMemberCard from "./AddMemberCard";
import EditMembersButton from "./EditMembersButton";

export default function TeamTab() {
  const [isEditing, setIsEditing] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Daniel Wong",
      role: "Project Leader",
      email: "danielwong@works.com",
      phone: "017-2233445",
      avatar: "/avatars/male-1.png",
    },
    {
      id: 2,
      name: "Sarah Tan",
      role: "Frontend Developer",
      email: "sarahtan@works.com",
      phone: "012-3456789",
      avatar: "/avatars/female-1.png",
    },
    {
      id: 3,
      name: "Aisyah Rahman",
      role: "Backend Developer",
      email: "aisyahrahman@works.com",
      phone: "019-5566778",
      avatar: "/avatars/female-2.png",
    },
    {
      id: 4,
      name: "Kevin Lim",
      role: "QA Engineer",
      email: "kevinlim@works.com",
      phone: "011-7788990",
      avatar: "/avatars/male-2.png",
    },
    {
      id: 5,
      name: "Priya Nair",
      role: "UX Designer",
      email: "priyanair@works.com",
      phone: "016-9988776",
      avatar: "/avatars/female-3.png",
    },
    {
      id: 6,
      name: "Jonathan Teo",
      role: "Mobile Developer",
      email: "jonathanteo@works.com",
      phone: "017-2233445",
      avatar: "/avatars/male-3.png",
    },
  ]);

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleAddMember = (newMember) => {
    setTeamMembers([...teamMembers, newMember]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-gray-800">My Team</h3>
        <EditMembersButton
          isEditing={isEditing}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            isEditing={isEditing}
            onRemove={() => handleRemoveMember(member.id)}
          />
        ))}

        {isEditing && <AddMemberCard onAdd={handleAddMember} />}
      </div>
    </div>
  );
}
