import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import TextSubmissionDialog from '@/pages/test/components/text-submission-dialog.jsx';
import { ConfirmDownloadDialog } from '@/pages/test/components/confirm-download-dialog.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { AlertCircleIcon, CalendarIcon, CircleXIcon, ClockIcon, FileTextIcon, UserIcon } from 'lucide-react';

const TestInfoDisplay = ({ data }) => {
    return (
        <Card className='w-full'>
            <CardContent className='p-6'>
                <div className='flex flex-wrap justify-between items-center gap-4'>
                    <InfoItem icon={<UserIcon className='w-5 h-5' />} label='Client' value={data.client} />
                    <InfoItem icon={<UserIcon className='w-5 h-5' />} label='Admin' value={data.admin} />
                    <InfoItem icon={<FileTextIcon className='w-5 h-5' />} label='Description' value={data.description} />
                    <InfoItem icon={<CalendarIcon className='w-5 h-5' />} label='Deadline' value={format(new Date(data.deadlineAt), 'yyyy-MM-dd h:mm a')} />
                    <div className='col-span-full'>
                        <StatusBadge status={data.status} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

TestInfoDisplay.propTypes = {
    data: PropTypes.object
}

const InfoItem = ({ icon, label, value }) => {
    return (
        <div className='flex items-center space-x-2'>
            {icon}
            <span className='font-medium text-gray-700'>{label}:</span>
            <span className='text-gray-600'>{value}</span>
        </div>
    )
}

InfoItem.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.string
}

const StatusBadge = ({ status }) => {
    let color = 'bg-gray-100 text-gray-800'
    let icon = <ClockIcon className='w-4 h-4 mr-1' />

    switch (status) {
        case 'Pending':
            color = 'bg-yellow-100 text-yellow-800'
            icon = <ClockIcon className='w-4 h-4 mr-1' />
            break
        case 'Awaiting':
            color = 'bg-green-100 text-green-800'
            icon = <ClockIcon className='w-4 h-4 mr-1' />
            break
        case 'Finish':
            color = 'bg-green-100 text-green-800'
            icon = <AlertCircleIcon className='w-4 h-4 mr-1' />
            break
        case 'Cancel':
            color = 'bg-red-100 text-red-800'
            icon = <CircleXIcon className='w-4 h-4 mr-1' />
            break
    }

    return (
        <div className='flex items-center'>
            <span className='font-medium text-gray-700 mr-2'>Status:</span>
            <Badge className={`${color} flex items-center`}>
                {icon}
                {status}
            </Badge>
        </div>
    )
}

StatusBadge.propTypes = {
    status: PropTypes.string
}

const TestTraineeList = ({ data, onStatusChange, onDownload, onZip }) => {
    return (
        <div className='w-full space-y-4'>
            <div className='flex flex-wrap justify-between'>
                <h1 className='md:text-lg font-semibold'>Test Details</h1>
                <ConfirmDownloadDialog
                    title='Download All Submissions'
                    description='This acction will be generate a zio file of all submissions.'
                    onConfirm={() => onZip(`${data.client}_${format(new Date(data.deadlineAt), 'yyyy-MM-dd')}.zip`)}
                >
                    <Button variant='outline'>Download All Submission</Button>
                </ConfirmDownloadDialog>
            </div>
            <TestInfoDisplay data={data} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-10'>No</TableHead>
                        <TableHead className='w-[150px]'>Name</TableHead>
                        <TableHead className='w-[150px]'>Batch</TableHead>
                        <TableHead className='w-[150px]'>Status</TableHead>
                        <TableHead className='w-[150px]'>File Submission</TableHead>
                        <TableHead className='w-[150px]'>Text Submission</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.testDetail?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium'>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                                <Select onValueChange={(value) => onStatusChange(item.id, value)} value={item.status}>
                                    <SelectTrigger className='w-28'>
                                        <SelectValue placeholder='Select Status'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Pending' className='hidden' disabled>Pending</SelectItem>
                                        <SelectItem value='Reject'>Reject</SelectItem>
                                        <SelectItem value='Submitted' className='hidden' disabled>Submitted</SelectItem>
                                        <SelectItem value='Accept'>Accept</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <ConfirmDownloadDialog
                                    title='Download Test Submission'
                                    description='This action will be generate a submission file.'
                                    onConfirm={() => onDownload(item.fileSubmission, item.fileName)}
                                >
                                    <Button variant='outline' disabled={!item.fileSubmission}>Download Submission</Button>
                                </ConfirmDownloadDialog>
                            </TableCell>
                            <TableCell>
                                <TextSubmissionDialog text={item.submissionText}>
                                    <Button variant='outline' disabled={!item.submissionText}>Show Text</Button>
                                </TextSubmissionDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

TestTraineeList.propTypes = {
    data: PropTypes.object,
    onStatusChange: PropTypes.func,
    onDownload: PropTypes.func,
    onZip: PropTypes.func
}

export default TestTraineeList;
