import type { Metadata } from 'next'
import { requireAuth } from '@/actions/auth.actions'
import type { TeamMember } from '@/types/firestore'

export const metadata: Metadata = { title: 'Team' }

const TEAM_NAME = 'Team 82 — Rocket Monitoring Interface'

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Leo Barnes', role: 'PM', photoUrl: null, blurb: 'Keeps the board honest and the team unblocked.' },
  { name: 'Darko Petkovic', role: 'BA', photoUrl: null, blurb: 'Turns vague client asks into requirements everyone can build from.' },
  { name: 'Ryan Kaminsky', role: 'UX', photoUrl: null, blurb: 'Designs the screens before anyone touches code.' },
  { name: 'Jingyi Qiu', role: 'Dev 1', photoUrl: null, blurb: 'Built this page. Also broke it twice before lunch.' },
  { name: 'Hung Le Hoang Thanh', role: 'Dev 2', photoUrl: null, blurb: 'Tests things Dev 1 swears already work.' },
]

export default async function TeamPage() {
  await requireAuth()

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-1">{TEAM_NAME}</h1>
      <p className="text-muted mb-4">Capstone Project — Client Proposal Platform</p>

      <div className="row g-4">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.name} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 text-center p-3">
              <div
                className="rounded-circle bg-secondary bg-opacity-25 text-secondary d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: 64, height: 64, fontWeight: 600 }}
              >
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="rounded-circle w-100 h-100" style={{ objectFit: 'cover' }} />
                ) : (
                  member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
                )}
              </div>
              <h3 className="h6 fw-semibold mb-0">{member.name}</h3>
              <p className="text-muted small mb-2">{member.role}</p>
              <p className="small text-muted mb-0">{member.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}